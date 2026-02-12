
import { GoogleGenAI, Type } from "@google/genai";
import { BudgetResult, PricingConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeProjectData(
  fileInfo: string,
  pricing: PricingConfig
): Promise<BudgetResult> {
  const prompt = `
    Como especialista em marcenaria e maquetaria de condomínios, analise as seguintes informações de um projeto de planta (AutoCAD) e gere um orçamento detalhado.
    
    Informações do Projeto: ${fileInfo}
    
    Use estes preços unitários para o cálculo:
    - MDF (metro): R$ ${pricing.mdfPerMeter}
    - Grama (m²): R$ ${pricing.grassPerSqMeter}
    - Árvore: R$ ${pricing.treeUnitPrice}
    - Bonecos (Figuras): R$ ${pricing.figureUnitPrice}
    - Carros: R$ ${pricing.carUnitPrice}
    - Janelas (m²): R$ ${pricing.windowPerSqMeter}
    - Luzes (Ponto): R$ ${pricing.lightPerPoint}
    - Pintura (m²): R$ ${pricing.paintingPerSqMeter}
    - Mão de obra (Hora): R$ ${pricing.laborHourlyRate}

    Extraia quantidades plausíveis com base no projeto descrito e calcule os totais.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          projectName: { type: Type.STRING },
          totalValue: { type: Type.NUMBER },
          estimatedLaborHours: { type: Type.NUMBER },
          woodworkingComplexity: { type: Type.STRING },
          summary: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                quantity: { type: Type.NUMBER },
                unit: { type: Type.STRING },
                unitPrice: { type: Type.NUMBER },
                totalPrice: { type: Type.NUMBER }
              },
              required: ["id", "name", "quantity", "unit", "unitPrice", "totalPrice"]
            }
          }
        },
        required: ["projectName", "totalValue", "items", "summary"]
      },
    },
  });

  const result = JSON.parse(response.text);
  return {
    ...result,
    laborRate: pricing.laborHourlyRate
  };
}
