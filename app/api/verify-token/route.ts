import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = body.token;
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return NextResponse.json({ message: "JWT secret not defined" }, { status: 500 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decoded = jwt.verify(token, secret) as any;

    // Vérifie que les infos attendues existent
    if (!decoded.id || !decoded.email || !decoded.role || !decoded.prenom || !decoded.nom) {
      return NextResponse.json({ message: "Invalid token payload" }, { status: 401 });
    }

    return NextResponse.json({
      user: {
        id: decoded.id,
        email: decoded.email,
        prenom: decoded.prenom,
        nom: decoded.nom,
        role: decoded.role,
      }
    });
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}


// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { token } = req.body;
//     const secret = process.env.JWT_SECRET;

//     if (!secret) {
//       return res.status(500).json({ message: "JWT secret not defined" });
//     }

//     try {
//       const decoded = jwt.verify(token, secret);
//       return res.status(200).json({ user: decoded });
//     } catch (error) {
//       return res.status(401).json({ message: "Invalid token", error });
//     }
//   } else {
//     return res.status(405).json({ message: "Method not allowed" });
//   }
// }
