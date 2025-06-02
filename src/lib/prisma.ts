/* as we have a finite connection to database for every change we cannot create a new connection so a singleton
object is used for connection through out */
import { PrismaClient } from "@prisma/client";
const prismaClientSingleton = () => {
  return new PrismaClient();
};
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal || prismaClientSingleton();

export default prisma;
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
