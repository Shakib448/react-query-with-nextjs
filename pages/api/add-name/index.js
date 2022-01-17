const items = [];

export default async (req, res) => {
  await new Promise((r) => setTimeout(r, 1000));

  if (req.method === "POST") {
    const { name } = req.body;
    if (Math.random() > 0.7) {
      res.status(500);
      res.json({ message: "Could not add item!" });
      return;
    }

    if (name !== "Bad Word") {
      items.push(name);
      res.status(200).send({ name });
    } else {
      res.status(400).send({ message: "Bad Word is not Allowed" });
    }

    return;
  } else {
    res.json({
      ts: Date.now(),
      items,
    });
  }
};

export const config = {
  api: {
    bodyParser: true,
  },
};
