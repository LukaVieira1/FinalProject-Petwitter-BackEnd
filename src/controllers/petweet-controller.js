import { prisma } from "../helpers/utils.js";

export const create = async (req, reply) => {
  try {
    const { content } = req.body;
    const petweet = await prisma.petweet.create({
      data: {
        content,
        user_id: req.user.id,
      },
    });
    return reply.status(201).send(petweet);
  } catch (error) {
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};

export const del = async (req, reply) => {
  const { id } = req.params;
  try {
    const petweet = await prisma.petweet.delete({
      where: {
        id: Number(id),
      },
    });
    reply.status(200).send("Petweet deletado com sucesso");
  } catch (error) {
    if (error.code === "P2025") {
      reply.status(500).send({ error: "Petweet não existe" });
    } else {
      reply.status(500).send({ error: "Deu problema mermão" });
    }
  }
};

export const getAll = async (req, reply) => {
  const { username } = req.query;

  try {
    if (username) {
      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });
      const userPetweets = await prisma.petweet.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return reply.send({ data: { userPetweets } });
    } else {
      const petweets = await prisma.petweet.findMany({
        include: {
          user: {
            select: {
              name: true,
              username: true,
              email: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return reply.send({ data: { petweets } });
    }
  } catch (error) {
    console.log(error);
    reply.status(500).send({ error: "Deu problema mermão" });
  }
};
