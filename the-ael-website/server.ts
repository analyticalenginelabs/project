import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Synapse AI Graphics Server" });
});

// Real-Time Gemini AI Shader & Reactive Graphics Hallucination Endpoint
app.post("/api/hallucinate-shader", async (req, res) => {
  try {
    const { prompt, style } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback response with dynamic simulated AI hallucinated parameters if key is not configured
      return res.json({
        success: true,
        source: "local-fallback",
        name: prompt ? `Hallucination: ${prompt}` : "Quantum Synapse Matrix",
        fragmentShader: `
          uniform float u_time;
          uniform vec2 u_resolution;
          varying vec2 vUv;
          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float pulse = sin(u_time * 2.0 + st.x * 10.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.02, 0.71, 0.83), vec3(0.38, 0.40, 0.94), pulse);
            color += vec3(sin(st.y * 20.0 + u_time * 3.0) * 0.2);
            gl_FragColor = vec4(color, 0.85);
          }
        `,
        colorPalette: ["#06b6d4", "#6366f1", "#ec4899", "#3b82f6"],
        particleBehavior: {
          speed: 1.8,
          waveFrequency: 3.5,
          glowIntensity: 2.2,
          morphSpeed: 1.2
        },
        aiDescription: `Fallback mode active (no GEMINI_API_KEY provided). Generated a reactive dual-spectrum cyan/violet wave lattice.`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const userPrompt = prompt || "Bioluminescent quantum synapse with reactive neural pulses and WebGPU micro-facets";

    const systemInstruction = `You are a real-time GLSL and WebGPU graphics synthesis engine.
Your task is to generate reactive graphics parameters, GLSL shader fragments, color palettes, and motion parameters based on the user's prompt.
Respond ONLY with a raw valid JSON object (no markdown, no code block backticks) with the following exact keys:
{
  "name": "Creative name for the hallucinated graphic",
  "fragmentShader": "GLSL fragment shader code snippet or main logic",
  "colorPalette": ["#hex1", "#hex2", "#hex3", "#hex4"],
  "particleBehavior": {
    "speed": number between 0.5 and 5.0,
    "waveFrequency": number between 1.0 and 10.0,
    "glowIntensity": number between 0.5 and 4.0,
    "morphSpeed": number between 0.2 and 3.0
  },
  "aiDescription": "1-2 sentence poetic/technical description of this hallucinated visual atmosphere"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Generate a reactive 3D shader and visual hallucination for: "${userPrompt}" with style "${style || 'cyberpunk'}".` }]
        }
      ],
      config: {
        systemInstruction,
        temperature: 0.9,
      }
    });

    const responseText = response.text || "";
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/^```/, "").replace(/```$/, "").trim();
    }

    const jsonResult = JSON.parse(cleanedText);
    return res.json({
      success: true,
      source: "gemini-2.5-flash",
      ...jsonResult
    });
  } catch (error: any) {
    console.error("Gemini hallucination error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Failed to generate AI visual hallucination",
      fallback: {
        name: "Emergency Neural Wave",
        colorPalette: ["#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"],
        particleBehavior: { speed: 2.0, waveFrequency: 4.0, glowIntensity: 2.0, morphSpeed: 1.0 },
        aiDescription: "Recovered via local emergency shader fallback loop."
      }
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
