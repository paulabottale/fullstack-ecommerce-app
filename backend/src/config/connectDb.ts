import { connect } from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

const URI_DB = process.env.URI_DB || "mongodb://localhost:27017/api-auth"

const connectDb = async () => {
  try {
    await connect(URI_DB)
    console.log(`✅ Servidor de Mongo DB en escucha`)
  } catch (error) {
    console.log(`🔴 Error al conectarse al servidor de Mongo DB | ${(error as Error).message}`)
  }
}

export { connectDb }