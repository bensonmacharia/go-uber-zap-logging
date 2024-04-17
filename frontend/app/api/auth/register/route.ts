import { NextRequest, NextResponse } from 'next/server';

const URL = process.env.NEXT_PUBLIC_API_URL + "/auth/register";

export const POST = async (req: NextRequest) => {
    try {
        let requestBody;
        try {
            requestBody = await req.json();
        } catch (parseError) {
            console.error("Error parsing request body:", parseError);
            return new NextResponse(JSON.stringify({ message: "Invalid request body" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        if (!requestBody.username || !requestBody.email || !requestBody.password) {
            return new NextResponse(JSON.stringify({ message: "Missing required fields" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
        }

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            return new NextResponse(JSON.stringify({ message: "Successfully registered." }), { status: 201, headers: { 'Content-Type': 'application/json' } });
        } else {
            return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}