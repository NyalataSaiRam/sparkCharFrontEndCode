import React from 'react';
import Conversation from './Conversation';
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';

const Conversations = () => {

    const { loading, conversations } = useGetConversations();


    // if (!Array.isArray(conversations)) {
    //     return <div>No conversations to display</div>;
    // }

    return (
        <div className='py-2 flex flex-col overflow-auto'>

            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    emoji={getRandomEmoji()}
                    lastIdx={idx === conversations.length - 1}
                />
            ))

            }
            {
                loading ? <span className='loading loading-spinner mx-auto' /> : null
            }
        </div>
    );
};

export default Conversations;
