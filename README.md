This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# HOW TO RUN

Run to create the database:

```sh
docker compose up
```

Then use prisma cli to run the migrations:

```sh
yarn prisma migrate dev
```

Get a csv with the embenddings for music use the `script/populate.ts` to populate the database.

This is a monolith using NextJs as front and backend so to run aplication use:

```sh
sudo yarn dev
```

YOU GONNA NEED A COHERE API KEY TO TRANSFORM USER INPUT INTO EMBEDDING
