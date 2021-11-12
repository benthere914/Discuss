import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUserServers, addServer } from '../../store/server';
import './mainContent.css'
import './serverContainer.css'

function ServersContainer() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user);

    //Redirect to login screen if no user is logged in
    if (!user) {
        history.push('/login')
    }

    const servers = useSelector(state => Object.values(state.servers));
    const [serverName, setServerName] = useState('');
    const [serverDescription, setServerDescription] = useState('');
    const [serverIcon, setServerIcon] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [allowAdd, setAllowAdd] = useState("notAllowed");
    const [isLoaded, setIsLoaded] = useState(true);



    useEffect(() => {
        if (user?.id) {
            dispatch(loadUserServers(user?.id)).then(() => setIsLoaded(true));
        }

        return () => {
            setIsLoaded(false)
        }

    }, [dispatch, user])

    useEffect(() => {
        if (serverName.length > 0) {
            setAllowAdd("nowCanCreate")
        } else {
            setAllowAdd("notAllowed")
        }

        return () => {
            setAllowAdd("notAllowed")
        }

    }, [serverName])

    const addServerf = async (e) => {
        e.preventDefault();
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')

        const newserver = await dispatch(addServer( serverName, serverDescription, serverIcon, user.id));

        if(newserver) {
          history.push(`/channels/${newserver.id}`)
        }
        return newserver
    }

    const handleCancel = (e) => {
        e.preventDefault()
        setShowAddForm(false)
        setServerName('')
        setServerDescription('')
        setServerIcon('')
    }

    return (
      <>
        {isLoaded && (
          <div id="serversContainer">
            {servers !== null ? (
              servers.map((server) => (
                <NavLink
                  key={`server_${server?.id}`}
                  to={`/channels/${server?.id}`}
                  className="singleServer"
                  activeClassName="selectedServer"
                >
                  {server?.icon ? (
                    <div className="serverInfo">
                      <div
                        className="serverIcon"
                        style={{ backgroundImage: `url(${server.icon})` }}
                      ></div>
                      <div id="serverNameHover">{server.name}</div>
                      <div className="activeServerIndicator"></div>
                    </div>
                  ) : (
                    <div className="serverInfo">
                      <div className="noIconServer">{server?.name[0]}</div>
                      <div id="serverNameHover">{server?.name} </div>
                      <div className="activeServerIndicator"></div>
                    </div>
                  )}
                </NavLink>
              ))): null}
            <div className="serverInfo" onClick={() => setShowAddForm(true)}>
              <div className="noIconServer" id="addServerButton">
                <i className="fas fa-plus"></i>
              </div>
              <div id="serverNameHover">Add a Server</div>
            </div>
            <NavLink to={"/guild-discovery"} className="singleServer" activeClassName="selectedServer">
              <div className="serverInfo">
                <div className="noIconServer" id="addServerButton">
                  <i className="fas fa-compass"></i>
                </div>
                <div id="noShow" className="activeServerIndicator"></div>
                <div id="expPublicServer">Explore Public Servers</div>
              </div>
            </NavLink>
          </div>
        )}
        <>
          {showAddForm && (
            <div className="addModal" id="addServerModal">
              <div
                className="addChannelFormContainer"
                id="addServerFormContainer"
              >
                <h3>Customize your server</h3>
                <h5>
                  Give your new server a personality with a name and an icon.
                  You can always change it later.
                </h5>
                <form onSubmit={addServerf} autoComplete="off">
                  <div className="addChannelInput">
                    <label className="addServerLabel">SERVER NAME</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverName}
                      required
                      autoComplete="off"
                      onChange={(e) => setServerName(e.target.value)}
                    />
                  </div>
                  <div className="addChannelInput">
                    <label className="addServerLabel">SERVER DESCRIPTION</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverDescription}
                      autoComplete="off"
                      onChange={(e) => setServerDescription(e.target.value)}
                    />
                  </div>
                  <div className="addChannelInput">
                    <label className="addServerLabel">ICON</label>
                    <input
                      className="addServerInput"
                      type="text"
                      value={serverIcon}
                      autoComplete="off"
                      onChange={(e) => setServerIcon(e.target.value)}
                    />
                  </div>
                  <div className="addChannelButtons" id="addServerButtons">
                    <div id="serverChannel" onClick={handleCancel}>
                      Cancel
                    </div>
                    <button
                      className="createServer"
                      id={allowAdd}
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      </>
    );
}

export default ServersContainer;
