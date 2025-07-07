"use client"
import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import nacl from "tweetnacl";
import bs58 from "bs58";
import * as ed25519 from 'ed25519-hd-key';
import { ethers } from 'ethers';

export interface CoinKeyPair {
    coinType: string;
    path: string;
    publicKey: string;
    privateKey: string;
    balance: number
}  

interface Wallet {
    mnemonic: string;
    keys: CoinKeyPair[];
    balance: number
}

type WalletContextType = {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
    wallets: Wallet[],
    setWallets: React.Dispatch<React.SetStateAction<Wallet[]>>
    mnemonicWords: string[],
    setMnemonicWords: React.Dispatch<React.SetStateAction<string[]>>
    next: () => void
    back: () => void;
    handleGenerateWallet: () => void
    pathTypes: string[],
    setPathTypes: React.Dispatch<React.SetStateAction<string[]>>
    mnemonicInput: string
    setMnemonicInput: React.Dispatch<React.SetStateAction<string>>
    handleWalletsDelete: () => void
    handleWalletDelete: (val: number) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider = ({children}: {children: React.ReactNode}) => {
    const [step, setStep] = useState(0)
    const [wallets, setWallets] = useState<Wallet[]>([])
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(" "))
    const [pathTypes, setPathTypes] = useState<string[]>(["501", "60"])
    const [mnemonicInput, setMnemonicInput] = useState<string>("")

    const next = () => setStep(step + 1)
    const back = () => setStep(step - 1)

    const createWalletFromMnemonic = (
            pathTypess: string[], 
            mnemonic: string, 
            accountIndex: number
        ): Wallet | null => {
            try {
                const seed = mnemonicToSeedSync(mnemonic)
                const keys: CoinKeyPair[] = [];
                const balance = 0
    
                for(let i=0;i<pathTypess.length;i++){
                    const coinType = pathTypess[i];
                    // console.log(coinType)
                    let path = "";
                    let publicKeyEncoded: string;
                    let privateKeyEncoded: string;
                    
                    switch(coinType){
                        case "501":
                            path = `m/44'/${coinType}'/0'/${accountIndex}'`;
                            const derivedSeed =  ed25519.derivePath(path, seed.toString("hex"));
    
                            const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed.key).secretKey;
                            const keypair = Keypair.fromSecretKey(secretKey);
                            privateKeyEncoded = bs58.encode(secretKey)
                            publicKeyEncoded = keypair.publicKey.toBase58();
    
                            keys.push({
                                coinType,
                                path,
                                privateKey: privateKeyEncoded,
                                publicKey: publicKeyEncoded,
                                balance: 0
                            })
                            break;
                        
                        case "60":
                            path = `m/44'/${coinType}'/0'/0/${accountIndex}'`;
                            const hdNode = ethers.HDNodeWallet.fromSeed(seed)
                            const wallet = hdNode.derivePath(path)
                            const privateKey = wallet.privateKey;
    
                            // const publicKey = wallet.publicKey;
                            const address = wallet.address;
    
                            keys.push({
                                coinType,
                                path,
                                privateKey: privateKey,
                                publicKey: address,
                                balance: 0
                            })
                            break;
                        
                        // case "0":
                        //     path = `m/44'/${coinType}'/0'/0/${accountIndex}`;
                        //     const root = bitcoin.bip32.fromSeed(seed, bitcoin.networks.bitcoin)
                        //     const btcBip32  = BIP32Factory(ecc)
                        //     const btcNode = btcBip32.fromSeed(seed);
                        //     const btcChild = btcNode.derivePath(path);
                        //     const { address } = bitcoin.payments.p2pkh({
                        //         pubkey: btcChild.publicKey,
                        //     });
                        //     keys.push({
                        //         coinType,
                        //         path,
                        //         privateKey: btcChild.privateKey!.toString("hex"),
                        //         publicKey: address!,
                        //     });
                        //     break;
                        default:
                            throw new Error(`Unsupported coin type: ${coinType}`);
                    }
    
                }
                return {
                    mnemonic,
                    keys,
                    balance
                };
            }catch(err) {
                console.log(err)
                toast.error("Failed to generate wallet. Please try again.");
                return null;
            }
        }
    
    const handleGenerateWallet = () => {
        let mnemonic = mnemonicInput.trim()
        // console.log(mnemonic)
        // console.log(mnemonicInput)

        if(mnemonic){
            if(!validateMnemonic(mnemonic)){
                toast.warning("Invalid sercet phrase. Please try again!!")
            }
        }else{
            mnemonic = generateMnemonic()
        }

        const words = mnemonic.split(" ")
        setMnemonicWords(words)

        const wallet = createWalletFromMnemonic(pathTypes, mnemonic, wallets.length)
        // console.log(wallet)

        if (wallet) {
            const updatedWallets = [...wallets, wallet];
            setWallets(updatedWallets);
            localStorage.setItem("wallets", JSON.stringify(updatedWallets));
            localStorage.setItem("mnemonics", JSON.stringify(words));
            localStorage.setItem("paths", JSON.stringify(pathTypes));
            toast.success("Wallet generated successfully!");
        }
    }

    const handleWalletsDelete = () => {
        setWallets([])
        setStep(0)
        localStorage.removeItem("wallets");
        localStorage.removeItem("mnemonics");
        toast.success("Wallets deleted successfully!");
    }

    const handleWalletDelete = (index: number) => {
        const updatedWallets = wallets.filter((_, i) => i !== index)
        setWallets(updatedWallets)

        if(updatedWallets.length == 0){
            setStep(0)
            localStorage.removeItem("wallets")
            localStorage.removeItem("mnemonics")
        }

        localStorage.setItem("wallets", JSON.stringify(updatedWallets));
        toast.success("Wallet deleted successfully!");
    }

    return (
        <WalletContext.Provider value={{wallets, setWallets, mnemonicWords, setMnemonicWords, step, setStep, next, back, handleGenerateWallet, pathTypes, setPathTypes, mnemonicInput, setMnemonicInput, handleWalletDelete, handleWalletsDelete}}>
            {children}
        </WalletContext.Provider>
    )
}

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}