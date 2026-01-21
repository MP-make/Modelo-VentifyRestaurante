# Ventify Restaurante

Web app progresiva para restaurantes que conecta con el SaaS POS Ventify, soportando 3 modos: delivery (e-commerce), waiter (toma pedidos), y menu (carta digital).

## Modos

- **Delivery (/)**: E-commerce para pedidos a domicilio.
- **Waiter (/waiter)**: Toma pedidos rápida para meseros, protegida con login/PIN.
- **Menu (/menu, /qr)**: Carta digital para clientes en mesa.

## Stack Tecnológico

- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- Zustand para estado
- API de Ventify

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
