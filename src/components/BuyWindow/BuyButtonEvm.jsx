
import style from './BuyWindow.module.scss';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export const BuyButtonEvm = () => {
    const { isConnected: isEvmConneted } = useAccount();

    return (
        (isEvmConneted ? <ProcessPaymentButtonEvm /> : <ConnectEvmButton />)
    );
};

const ConnectEvmButton = () => {
    const { openConnectModal } = useConnectModal();

    return (
        <div
            className={style.pay_button}
            style={{
                opacity: '0.5',
                cursor: 'pointer'
            }}
            onClick={openConnectModal}>
            Connect EVM Wallet To Buy FLFI
        </div>
    );
};