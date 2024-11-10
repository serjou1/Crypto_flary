import React, { useEffect, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAccount, useDisconnect } from 'wagmi';
import style from '../BuyWindow/BuyWindow.module.scss';
import Arrow from '../../assets/arrow_down.svg';
import { useWalletConnectButton } from '@solana/wallet-adapter-base-ui';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import ETH from '../../assets/ETH.svg';
import SOL from '../../assets/solana.svg';

function ConnectHeaderMenu() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isConnected: isEvmConnected } = useAccount();
    const { connected: isSolanaConnected } = useWallet();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className={style.button_group} style={{ width: 250 }}>
            <div className={style.button}
                onClick={toggleDropdown}
                style={
                    isDropdownOpen
                        ? {
                            borderBottomLeftRadius: '0',
                            borderBottomRightRadius: '0',
                            padding: '10px 15px',
                            width: '100%',
                        }
                        : { padding: '10px 15px', width: '100%' }
                }
            >
                {
                    isSolanaConnected
                        ? <SolanaConnectedButtonContent address={"ddddd"} />
                        : (
                            isEvmConnected
                                ? <EvmConnectedButtonContent />
                                : <NotConnectedButtonContent />
                        )
                }
                <img src={Arrow} alt="" />
                {
                    isDropdownOpen && (
                        <div className={style.drop_network}>
                            <EvmConnectionManageElement />
                            <SolanaConnectionManagerElement />
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ConnectHeaderMenu;

const NotConnectedButtonContent = () => {
    return (
        <>
            <div className={style.button_title}>
                <p>Connect Wallet</p>
            </div>
        </>
    )
};

const EvmConnectedButtonContent = () => {
    const { address, connector } = useAccount();

    const [displayAddress, setDisplayAddress] = useState(getDisplayAddress(address));
    const [walletIcon, setWalletIcon] = useState(connector.icon);

    useEffect(() => {
        setDisplayAddress(getDisplayAddress(address));

        setWalletIcon(connector.icon ??
            (connector.id === 'phantom' ? PHANTOM : null));
    }, [address, connector.icon]);

    return (
        <>
            <div className={style.button_title} style={{ display: 'flex' }}>
                {walletIcon && <img src={walletIcon} alt="" />}
                <p style={{ marginInline: 15 }}>{displayAddress}</p>
            </div>
        </>
    )
};

const SolanaConnectedButtonContent = () => {
    const { walletIcon } = useWalletConnectButton();
    const { publicKey } = useWallet();

    const [displayAddress, setDisplayAddress] = useState(getDisplayAddress(publicKey.toBase58()));

    useEffect(() => {
        const registerSolanaAddress = async () => {
            try {
                const referrerCode = new URLSearchParams(window.location.search).get('ref');

                await fetch("https://back.flary.finance/api/user/registerUser", {
                    method: "POST",
                    body: JSON.stringify({ address: publicKey?.toBase58(), referrerCode })
                });
            } catch (error) {
                console.log("Failed to register solana addres", error);
            }
        };

        setDisplayAddress(getDisplayAddress(publicKey.toBase58()));

        registerSolanaAddress();
    }, [publicKey]);

    return (
        <>
            <div className={style.button_title} style={{ display: 'flex' }}>
                <img src={walletIcon} alt="" />
                <p style={{ marginInline: 15 }}>{displayAddress}</p>
            </div>
        </>
    )
};

const DisconnectButton = (
    { disconnect }
) => {

    return (
        <div className={style.button_title} onClick={disconnect}>
            <p>✕</p>
        </div>
    )
};

const ConnectEvmCustomButton = () => {
    const { openConnectModal } = useConnectModal();

    return (
        <div className={style.button_title} onClick={openConnectModal} style={{ display: 'flex' }}>
            <img src={ETH} alt="" />
            <p style={{ marginInline: 15 }}>Connect EVM</p>
        </div>
    )
};

const ConnectSolanaCustomButton = () => {
    const { setVisible } = useWalletModal();

    return (
        <div className={style.button_title} onClick={() => setVisible(true)} style={{ display: 'flex' }}>
            <img src={SOL} alt="" />
            <p style={{ marginInline: 15 }}>Connect SOL</p>
        </div>
    )
};

const SolanaConnectionManagerElement = () => {
    const { connected: isSolanaConnected, disconnect } = useWallet();

    return (
        <div className={style.button_drop}>
            {
                isSolanaConnected
                    ? <div style={{ display: 'flex' }}>
                        <SolanaConnectedButtonContent />
                        <DisconnectButton disconnect={disconnect} />
                    </div>
                    : <ConnectSolanaCustomButton />
            }
        </div>
    )
};

const EvmConnectionManageElement = () => {
    const { isConnected: isEvmConnected } = useAccount();
    const { disconnect } = useDisconnect();

    return (
        <div className={style.button_drop}>
            {
                isEvmConnected
                    ? <div style={{ display: 'flex' }}>
                        <EvmConnectedButtonContent />
                        <DisconnectButton disconnect={disconnect} />
                    </div>
                    : <ConnectEvmCustomButton />
            }
        </div>
    )
};

const getDisplayAddress = (address) => {
    console.log(address);
    return address ? `${address.slice(0, 4)}...${address.slice(-4)}` : "";
};

const PHANTOM = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjEwOCIgdmlld0JveD0iMCAwIDEwOCAxMDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDgiIGhlaWdodD0iMTA4IiByeD0iMjYiIGZpbGw9IiNBQjlGRjIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik00Ni41MjY3IDY5LjkyMjlDNDIuMDA1NCA3Ni44NTA5IDM0LjQyOTIgODUuNjE4MiAyNC4zNDggODUuNjE4MkMxOS41ODI0IDg1LjYxODIgMTUgODMuNjU2MyAxNSA3NS4xMzQyQzE1IDUzLjQzMDUgNDQuNjMyNiAxOS44MzI3IDcyLjEyNjggMTkuODMyN0M4Ny43NjggMTkuODMyNyA5NCAzMC42ODQ2IDk0IDQzLjAwNzlDOTQgNTguODI1OCA4My43MzU1IDc2LjkxMjIgNzMuNTMyMSA3Ni45MTIyQzcwLjI5MzkgNzYuOTEyMiA2OC43MDUzIDc1LjEzNDIgNjguNzA1MyA3Mi4zMTRDNjguNzA1MyA3MS41NzgzIDY4LjgyNzUgNzAuNzgxMiA2OS4wNzE5IDY5LjkyMjlDNjUuNTg5MyA3NS44Njk5IDU4Ljg2ODUgODEuMzg3OCA1Mi41NzU0IDgxLjM4NzhDNDcuOTkzIDgxLjM4NzggNDUuNjcxMyA3OC41MDYzIDQ1LjY3MTMgNzQuNDU5OEM0NS42NzEzIDcyLjk4ODQgNDUuOTc2OCA3MS40NTU2IDQ2LjUyNjcgNjkuOTIyOVpNODMuNjc2MSA0Mi41Nzk0QzgzLjY3NjEgNDYuMTcwNCA4MS41NTc1IDQ3Ljk2NTggNzkuMTg3NSA0Ny45NjU4Qzc2Ljc4MTYgNDcuOTY1OCA3NC42OTg5IDQ2LjE3MDQgNzQuNjk4OSA0Mi41Nzk0Qzc0LjY5ODkgMzguOTg4NSA3Ni43ODE2IDM3LjE5MzEgNzkuMTg3NSAzNy4xOTMxQzgxLjU1NzUgMzcuMTkzMSA4My42NzYxIDM4Ljk4ODUgODMuNjc2MSA0Mi41Nzk0Wk03MC4yMTAzIDQyLjU3OTVDNzAuMjEwMyA0Ni4xNzA0IDY4LjA5MTYgNDcuOTY1OCA2NS43MjE2IDQ3Ljk2NThDNjMuMzE1NyA0Ny45NjU4IDYxLjIzMyA0Ni4xNzA0IDYxLjIzMyA0Mi41Nzk1QzYxLjIzMyAzOC45ODg1IDYzLjMxNTcgMzcuMTkzMSA2NS43MjE2IDM3LjE5MzFDNjguMDkxNiAzNy4xOTMxIDcwLjIxMDMgMzguOTg4NSA3MC4yMTAzIDQyLjU3OTVaIiBmaWxsPSIjRkZGREY4Ii8+Cjwvc3ZnPgo="