import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import {addMember, removeMember} from '../../store/server';

import './featuredServerCard.css'

function ServerCard({user, server, userServers}) {
    const dispatch = useDispatch();
  
    const checkIfUserInServer = () => {
        let alreadyJoined = false;
        for (let [key, value] of Object.entries(userServers)) {
            if (value.id === server.id) {
                alreadyJoined = true;
                break;
            }
        }

        return alreadyJoined;
    }

    const leaveServer = async () => {
        await dispatch(removeMember(user.id, server.id));
    }

    const alreadyJoined = checkIfUserInServer();
function joinServer(){
dispatch(addMember(user.id, server.id));
}

    return (
        <div className="singleServerCardContainer">
            {server.icon? (
                <div
                    className="singleServerImage"
                    style={{ backgroundImage: `url(${server.icon})` }}>
                </div>
            ) : (
                <div
                    className="singleServerNoImage"
                    style={{ backgroundImage: `url(https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636589623/Discuss/discussIcon_tkg8y9.png)` }}>
                </div>
            )}
            <div className="bottomServerCard">
                <div className="serverText">
                    <h6>{server.name}</h6>
                    <p>{server.description}</p>
                </div>
                {alreadyJoined? (
                    <div className="joinLeaveServer leave" onClick={leaveServer}>Leave Server</div>
                ) : (
                    <button className="joinLeaveServer join" onClick={joinServer}>Join Server</button>
                )}
            </div>
        </div>
    )
}

export default ServerCard;
