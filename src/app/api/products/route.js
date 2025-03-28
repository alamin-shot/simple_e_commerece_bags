import { MongoClient } from "mongodb";

export async function POST(request) {
	try {
		const productData = await request.json();
		console.log("Received data:", productData);
		// Connect to MongoDB
		const client = await MongoClient.connect(process.env.MONGO_URI_PRODUCTS);
		const db = client.db("library");

		// Insert the product
		const result = await db.collection("products").insertOne(productData);

		// Close connection
		await client.close();

		return new Response(
			JSON.stringify({
				success: true,
				insertedId: result.insertedId,
			}),
			{
				status: 201,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: error.message,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	}
}

export async function GET(request) {
	let client;
	try {
		// Connect to MongoDB
		client = await MongoClient.connect(process.env.MONGO_URI_PRODUCTS);
		const db = client.db("library");

		// Get all products from the collection
		const products = await db.collection("products").find().toArray();

		return new Response(
			JSON.stringify({
				success: true,
				data: products,
			}),
			{
				status: 200,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} catch (error) {
		console.error("Error fetching products:", error);
		return new Response(
			JSON.stringify({
				success: false,
				error: error.message,
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
	} finally {
		if (client) {
			await client.close();
		}
	}
}
