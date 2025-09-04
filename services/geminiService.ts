import { GoogleGenAI, Type } from "@google/genai";
import type { Book } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const bookSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "책을 식별하기 위한 고유 ID. UUID 형식을 권장합니다." },
    title: { type: Type.STRING, description: "책의 제목" },
    author: { type: Type.STRING, description: "책의 저자" },
    publicationYear: { type: Type.INTEGER, description: "책이 출판된 연도" },
    publisher: { type: Type.STRING, description: "책의 출판사" },
    genre: { type: Type.STRING, description: "책의 장르" },
    summary: { type: Type.STRING, description: "200-300자 내외의 상세한 책 줄거리 요약" },
    coverImageUrl: { type: Type.STRING, description: "책 표지를 위한 플레이스홀더 이미지 URL. 반드시 'https://picsum.photos/400/600' 형식이어야 합니다." },
  },
  required: ["id", "title", "author", "publicationYear", "publisher", "genre", "summary", "coverImageUrl"],
};

const bookListSchema = {
    type: Type.ARRAY,
    items: bookSchema,
};


export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const prompt = `"${query}"와 관련이 깊은 실존하는 책 5권을 찾아 목록으로 만들어줘. 만약 관련 책을 찾을 수 없다면, "${query}"라는 키워드를 포함하는 가상의 책 5권의 목록을 창의적으로 만들어줘. 응답은 반드시 정의된 JSON 스키마를 따라야 해. 각 책의 coverImageUrl은 'https://picsum.photos/seed/UNIQUE_SEED/400/600' 형식을 따라야 하며, UNIQUE_SEED 부분은 각 책마다 달라야 해.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: bookListSchema,
      },
    });

    const jsonText = response.text.trim();
    const booksData = JSON.parse(jsonText);
    
    // Ensure data is an array
    if (!Array.isArray(booksData)) {
      console.error("API did not return an array:", booksData);
      return [];
    }
    
    return booksData.map((book: any) => {
        // Validate image URL format as an extra precaution
        if (!book.coverImageUrl || !book.coverImageUrl.startsWith('https://picsum.photos')) {
          book.coverImageUrl = `https://picsum.photos/seed/${book.id || book.title}/400/600`;
        }
        return book;
    }) as Book[];

  } catch (error) {
    console.error("Error fetching book data from Gemini API:", error);
    throw new Error("책 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요.");
  }
};
