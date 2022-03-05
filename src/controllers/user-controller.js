import { prisma } from "../helpers/utils.js";

// export const getAll = async (req, res) => {
//   try {
//     let users = await prisma.user.findMany({
//       select: { id: true, email: true, username: true, name: true },
//     });
//     return res.send({ data: { users } });
//   } catch (error) {
//     console.error("users", error);
//     res.status(500).send({ error: `Cannot fetch users` });
//   }
// };

export const getByID = async (req, reply) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: { id: true, email: true, username: true, name: true },
    });
    return reply.send({ data: { user } });
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};

export const getByUsername = async (req, reply) => {
  const { username } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        createdAt: true,
      },
    });
    return reply.send({ data: { user } });
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
