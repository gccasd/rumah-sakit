import { HTMLAttributes } from 'react';

export default function NotifSuccess({ message, hidden, className = '', ...props }: HTMLAttributes<HTMLDivElement> & { message?: string }) {
    return message ? (
        <div className='bg-green-100 px-4 py-5 rounded-md border-2 border-green-300' hidden={hidden}>
            <p className='text-green-600'>{message}</p>
        </div>
    ) : null;
}
