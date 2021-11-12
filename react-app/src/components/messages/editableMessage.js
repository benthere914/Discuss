import React, { useState } from 'react';
import {  useDispatch } from 'react-redux';
import { deleteSingleMessage, updateMessageBody } from '../../store/messages';
import './editableMessages.css'

function EditableMessage({userId, channelId, message}) {
    const dispatch = useDispatch();
    const channel_id = channelId;
    const message_id = message.id;
    const user_id = userId;
    const [messageBody, setMessageBody] = useState(message?.message);

    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false)

    const handleCancel = () => {
        setShowDelete(false)
    }

    const handleDelete = async (e) => {

        e.preventDefault();

        const data = await dispatch(deleteSingleMessage(message_id))
        if (data) {
        } else {
            setShowDelete(false)
        }
    }

    const updateMessage = async (e) => {
        e?.preventDefault();

        await dispatch(updateMessageBody(message_id, channel_id, user_id, messageBody))
        setShowEdit(false)
        // window.location.reload()

    }

    return (
        <div className="messageNameHolder" id="editableMessage">
            {!showEdit && !showDelete && (
                <div className="owner-messages">
                    <div className="own-msg-test"key={message?.id}>
                        <div>
                            <div className="user-time">
                                <div style={{ fontWeight: 900, fontSize: 15 }}> {message?.user?.username}</div>
                                <div className="time">{message?.date.slice(0,16)}</div>
                            </div>
                            <div className="message-text">
                                {message?.message}
                            </div>
                        </div>
                        <div className="editMessageIconContainer">
                            <div className="editMessageIcons" id="leftIconMessage" onClick={() => setShowEdit(true)}>
                                <i className="fas fa-cog" id="editIcons"></i>
                            </div>
                            <div className="editMessageIcons" onClick={() => setShowDelete(true)}>
                                <i className="far fa-trash-alt" id="editIcons"></i>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {showEdit && (
                <div>
                    <div className="owner-messages">
                        <div className="own-msg-test"key={message?.id}>
                            <div className="user-time">
                                <div style={{ fontWeight: 900, fontSize: 15 }}> {message?.user?.username}</div>
                                        <div className="time">{message?.date.slice(0,16)}</div>
                                </div>
                                <form className="updateMessageForm" onSubmit={updateMessage} autoComplete="off">
                                    <input
                                        type="text"
                                        value={messageBody}
                                        required
                                        autoComplete="off"
                                        onChange={(e) => setMessageBody(e.target.value)}
                                        className="edit-input"
                                        onKeyDown={(e) => {if (e.key === 'Enter'){updateMessage()}}}
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => setShowEdit(false)}>
                                            <div className="editChannelIcons">
                                                <i class="edit-hyper">cancel</i>
                                            </div>
                                        </button>
                                        <button type="submit">
                                            <div className="editChannelIcons" id="leftIcon">
                                                <i class="edit-hyper">save</i>
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                </div>
            )}
            {showDelete && (
                <div className="addModal" id="addServerModal">
                    <div className="modal-container">
                        <div className="top-part">
                            <h3 id="deleteMessageHeader">Delete Message</h3>
                            <h5 id="deleteMessageSubHeader" >Are you sure you want to delete this message? </h5>
                                <div className="message-preview">
                                    <div className="message-top-half">
                                        <img src={message?.user?.icon} className="temp" alt="temp-icon" width="42" height="42"></img>
                                    </div>
                                    <div className="message-bottom-half">
                                        <div className="message-header">
                                        {message?.user?.username}
                                        <div className="time">{message?.date.slice(0,16)}</div>
                                        </div>
                                            <div className="message-text">
                                                {message?.message}
                                            </div>
                                    </div>
                                </div>
                        </div>
                        <div className="bottom-part">
                            <div id="deleteMessage" onClick={handleDelete}>Delete</div>
                            <div id="cancelMessage" onClick={handleCancel}>Cancel</div>
                        </div>
                    </div>
                </div>

            )}
        </div>

    )
}

export default EditableMessage;
