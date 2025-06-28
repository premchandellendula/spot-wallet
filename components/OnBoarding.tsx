"use client"
import React, { useState } from 'react'
import Spot from './icons/Spot';
import Button from './ui/Button';
import SecurityInstructions from './onborading/SecurityInstructions';
import SecretPhrase from './onborading/SecretPhrase';
import { toast } from 'sonner';
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from 'bip39';
import * as ed25519 from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';
import bs58 from "bs58";
import { ethers } from 'ethers';
import UserWallet from './UserWallet';

export interface CoinKeyPair {
    coinType: string;
    path: string;
    publicKey: string;
    privateKey: string;
}  

interface Wallet {
    mnemonic: string;
    keys: CoinKeyPair[]
}
const OnBoarding = () => {
    const [step, setStep] = useState(0)
    const [wallets, setWallets] = useState<Wallet[]>([])
    const [pathTypes, setPathTypes] = useState<string[]>(["501", "60", "0"])
    const [mnemonicInput, setmnemonicInput] = useState<string>("")
    const [mnemonicWords, setMnemonicWords] = useState<string[]>(Array(12).fill(" "))

    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);

    const createWalletFromMnemonic = (
        pathTypes: string[], 
        mnemonic: string, 
        accountIndex: number
    ): Wallet | null => {
        try {
            const seed = mnemonicToSeedSync(mnemonic)
            const keys: CoinKeyPair[] = [];

            for(let i=0;i<pathTypes.length;i++){
                const coinType = pathTypes[i];
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
                            publicKey: publicKeyEncoded
                        })
                        break;
                    
                    case "60":
                        path = `m/44'/${coinType}'/0'/0/${accountIndex}'`;
                        const hdNode = ethers.HDNodeWallet.fromSeed(seed)
                        const wallet = hdNode.derivePath(path)
                        const privateKey = wallet.privateKey;

                        const publicKey = wallet.publicKey;
                        const address = wallet.address;

                        keys.push({
                            coinType,
                            path,
                            privateKey: privateKey,
                            publicKey: address
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

                return {
                    mnemonic,
                    keys
                };
            }
        }catch(err) {
            toast.error("Failed to generate wallet. Please try again.");
            return null;
        }
        return null
    }

    const handleGenerateWallet = () => {
        let mnemonic = mnemonicInput.trim()

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

        if (wallet) {
            const updatedWallets = [...wallets, wallet];
            setWallets(updatedWallets);
            localStorage.setItem("wallets", JSON.stringify(updatedWallets));
            localStorage.setItem("mnemonics", JSON.stringify(words));
            localStorage.setItem("paths", JSON.stringify(pathTypes));
            toast.success("Wallet generated successfully!");
        }
    }

    return (
        <div className='h-screen bg-zinc-900 flex justify-center items-center'>
            <div className='max-w-md min-h-60 px-4 py-6 border border-gray-800 rounded-md flex flex-col justify-between'>
                {step === 0 && <>
                        <div>
                            <div className='flex justify-center items-center gap-1 mb-2'>
                                <Spot size='60px' color='white' />
                                <h2 className='text-4xl font-semibold'>Spot</h2>
                            </div>
                            <p className='text-center text-gray-400 text-lg'>Create a new wallet to get started.</p>
                        </div>

                        <div>
                            <Button type='button' size='sm' text='Create a wallet' width='full' variant='primary' onClick={next} />
                        </div>
                    </> 
                }

                {step === 1 && <SecurityInstructions next={next} back={back} handleGenerateWallet={handleGenerateWallet} />}

                {step === 2 && <SecretPhrase mnemonicWords={mnemonicWords} next={next} />}

                {step === 3 && <UserWallet  />}
            </div>
        </div>
    )
}

export default OnBoarding