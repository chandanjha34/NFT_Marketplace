// types/env.d.ts
namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
  }
}
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (...args: any[]) => Promise<any>;
    // add other ethereum properties you use here if needed
  };
}
