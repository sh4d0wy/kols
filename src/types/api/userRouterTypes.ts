export interface ResetEmailParams {
    walletAddress: string;
    message: string;
    signature: string;
    timestamp: number;
  }

export interface RegisterEmailParams {
    walletAddress: string;
    email: string;
    message: string;
    signature: string;
    timestamp: number;
}