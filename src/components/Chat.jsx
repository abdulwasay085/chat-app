import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const initialMockGroups = [
  { id: 'chat', name: 'Chat' },
  { id: 'updates', name: 'Updates' },
];

const initialMockOnlineUsers = [
  { id: 1, username: 'Alice', avatar_url: '' },
  { id: 2, username: 'Bob', avatar_url: '' },
  { id: 3, username: 'Charlie', avatar_url: '' },
];

const Chat = () => {
  const [mockGroups, setMockGroups] = useState(initialMockGroups);
  const [currentGroup, setCurrentGroup] = useState(initialMockGroups[0].id);
  const [messages, setMessages] = useState([]); // Will be replaced with Supabase data
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [profile, setProfile] = useState({ username: 'User', avatar_url: '' });
  const [showProfile, setShowProfile] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [mockOnlineUsers, setMockOnlineUsers] = useState(initialMockOnlineUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', avatar_url: '' });
  const [newUserFile, setNewUserFile] = useState(null);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const fileInputRef = useRef();
  const newUserFileInputRef = useRef();
  const navigate = useNavigate();

  // Placeholder for sending a message
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentChatUser) return;
    setMessages([
      ...messages,
      {
        id: Date.now(),
        content: input,
        user: profile,
        to: currentChatUser.username,
        created_at: new Date().toISOString(),
      },
    ]);
    setInput('');
  };

  // Handle avatar file selection for profile
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setProfile((p) => ({ ...p, avatar_url: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Handle avatar file selection for new user
  const handleNewUserAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewUserFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewUser((u) => ({ ...u, avatar_url: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add new user to mockOnlineUsers
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.username.trim()) return;
    setMockOnlineUsers([
      ...mockOnlineUsers,
      {
        id: Date.now(),
        username: newUser.username,
        avatar_url: newUser.avatar_url,
      },
    ]);
    setShowAddUser(false);
    setNewUser({ username: '', avatar_url: '' });
    setNewUserFile(null);
  };

  // Filter messages for the current chat user (demo: by username)
  const filteredMessages = currentChatUser
    ? messages.filter(
        (msg) =>
          (msg.user.username === profile.username && msg.to === currentChatUser.username) ||
          (msg.user.username === currentChatUser.username && msg.to === profile.username)
      )
    : [];

  // Sign out: clear state and redirect to login
  const handleSignOut = () => {
    setMessages([]);
    setCurrentChatUser(null);
    setProfile({ username: 'User', avatar_url: '' });
    navigate('/login');
  };

  // Add new group to mockGroups
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newId = newGroupName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    setMockGroups([...mockGroups, { id: newId, name: newGroupName }]);
    setShowAddGroup(false);
    setNewGroupName('');
  };

  return (
    <div className="chat-wrapper">
      {/* Top right controls */}
      <div style={{position:'absolute', top:24, right:32, zIndex:10, display:'flex', gap:'0.7em'}}>
        <button className="profile-btn" style={{background:'#fff', color:'#ff5e62', minWidth:100}} onClick={() => setShowProfile(true)}>
          Edit Profile
        </button>
        <button className="profile-btn" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5em', background: '#fff', color: '#ff5e62', minWidth:100}} onClick={handleSignOut}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"/></svg>
          Sign Out
        </button>
      </div>
      <aside className="chat-sidebar" style={{paddingTop:0}}>
        <button
          className="profile-btn"
          style={{width:'100%', background:'linear-gradient(90deg,#ff5e62 0%,#ff9966 100%)', color:'#fff', fontWeight:700, fontSize:'1.1em', padding:'0.9em', borderRadius:10, marginBottom:'0.7em', boxShadow:'0 2px 8px rgba(255,94,98,0.10)', cursor:'pointer'}}
          onClick={()=>navigate('/groups')}
        >
          Groups
        </button>
        <button
          className="profile-btn"
          style={{width:'100%', background:'linear-gradient(90deg,#ff9966 0%,#ff5e62 100%)', color:'#fff', fontWeight:700, fontSize:'1.1em', padding:'0.9em', borderRadius:10, marginBottom:'1.2em', boxShadow:'0 2px 8px rgba(255,94,98,0.10)', cursor:'pointer'}}
          onClick={()=>navigate('/chat')}
        >
          Chat
        </button>
        <div style={{marginBottom: '1em'}}>
          <h4 style={{color:'#fff', fontSize:'1em', margin:'1em 0 0.5em 0'}}>Online Users</h4>
          <div style={{display:'flex', flexDirection:'column', gap:'0.5em'}}>
            {mockOnlineUsers.map(u => (
              <div
                key={u.id}
                style={{display:'flex', alignItems:'center', gap:'0.5em', cursor:'pointer', background: currentChatUser && currentChatUser.id === u.id ? '#ff5e62' : 'transparent', borderRadius: 6, padding: '0.3em 0.5em'}}
                onClick={() => setCurrentChatUser(u)}
              >
                {u.avatar_url ? (
                  <img src={u.avatar_url} alt="avatar" style={{width:28, height:28, borderRadius:'50%'}} />
                ) : (
                  <div className="avatar-placeholder" style={{width:28, height:28, fontSize:'1em'}}>{u.username[0]}</div>
                )}
                <span style={{color:'#fff', fontSize:'0.98em'}}>{u.username}</span>
              </div>
            ))}
          </div>
          <button className="profile-btn" style={{marginTop: '0.7em', background:'#fff', color:'#ff5e62'}} onClick={() => setShowAddUser(true)}>
            + Add User
          </button>
        </div>
      </aside>
      <main className="chat-main">
        {currentChatUser ? (
          <div style={{padding: '1em 1.5em', borderBottom: '1px solid rgba(255,255,255,0.18)', color:'#fff', fontWeight:600, fontSize:'1.1em'}}>
            Chat with {currentChatUser.username}
          </div>
        ) : (
          <div style={{padding: '1em 1.5em', borderBottom: '1px solid rgba(255,255,255,0.18)', color:'#fff', fontWeight:500, fontSize:'1.05em', opacity:0.7}}>
            Select a user to start chatting
          </div>
        )}
        <div className="chat-messages">
          {filteredMessages.map(msg => (
            <div className="chat-bubble" key={msg.id}>
              <div className="chat-avatar">
                {msg.user.avatar_url ? (
                  <img src={msg.user.avatar_url} alt="avatar" />
                ) : (
                  <div className="avatar-placeholder">{msg.user.username[0]}</div>
                )}
              </div>
              <div className="chat-content">
                <div className="chat-meta">
                  <span className="chat-username">{msg.user.username}</span>
                  <span className="chat-time">{new Date(msg.created_at).toLocaleTimeString()}</span>
                </div>
                <div className="chat-text">{msg.content}</div>
              </div>
            </div>
          ))}
        </div>
        {typing && <div className="typing-indicator">Someone is typing...</div>}
        <form className="chat-input-bar" onSubmit={handleSend}>
          <input
            type="text"
            placeholder={currentChatUser ? `Message ${currentChatUser.username}...` : 'Select a user to chat'}
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => setTyping(true)}
            onBlur={() => setTyping(false)}
            disabled={!currentChatUser}
          />
          <button type="submit" disabled={!currentChatUser}>Send</button>
        </form>
      </main>
      {showProfile && (
        <div className="profile-modal">
          <div className="profile-card">
            <h3>Edit Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1em' }}>
              <div style={{ marginBottom: '0.5em' }}>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div className="avatar-placeholder" style={{ width: 64, height: 64, fontSize: '2em' }}>{profile.username[0]}</div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
              <button type="button" onClick={() => fileInputRef.current.click()} style={{ marginBottom: '0.5em' }} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Avatar'}
              </button>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={profile.username}
              onChange={e => setProfile({ ...profile, username: e.target.value })}
            />
            <button onClick={() => setShowProfile(false)}>Save</button>
          </div>
        </div>
      )}
      {showAddUser && (
        <div className="profile-modal">
          <div className="profile-card">
            <h3>Add User</h3>
            <form onSubmit={handleAddUser} style={{display:'flex', flexDirection:'column', gap:'1em'}}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1em' }}>
                <div style={{ marginBottom: '0.5em' }}>
                  {newUser.avatar_url ? (
                    <img src={newUser.avatar_url} alt="avatar" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div className="avatar-placeholder" style={{ width: 64, height: 64, fontSize: '2em' }}>{newUser.username[0] || '+'}</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={newUserFileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleNewUserAvatarChange}
                />
                <button type="button" onClick={() => newUserFileInputRef.current.click()} style={{ marginBottom: '0.5em' }}>
                  Upload Avatar
                </button>
              </div>
              <input
                type="text"
                placeholder="Username"
                value={newUser.username}
                onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                required
              />
              <div style={{display:'flex', gap:'1em', justifyContent:'center'}}>
                <button type="submit" style={{background:'#ff5e62', color:'#fff', border:'none', borderRadius:6, padding:'0.7em 1.5em', fontWeight:500}}>Add</button>
                <button type="button" style={{background:'#eee', color:'#ff5e62', border:'none', borderRadius:6, padding:'0.7em 1.5em', fontWeight:500}} onClick={()=>setShowAddUser(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAddGroup && (
        <div className="profile-modal">
          <div className="profile-card">
            <h3>Add Group</h3>
            <form onSubmit={handleAddGroup} style={{display:'flex', flexDirection:'column', gap:'1em'}}>
              <input
                type="text"
                placeholder="Group Name"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                required
              />
              <div style={{display:'flex', gap:'1em', justifyContent:'center'}}>
                <button type="submit" style={{background:'#ff5e62', color:'#fff', border:'none', borderRadius:6, padding:'0.7em 1.5em', fontWeight:500}}>Add</button>
                <button type="button" style={{background:'#eee', color:'#ff5e62', border:'none', borderRadius:6, padding:'0.7em 1.5em', fontWeight:500}} onClick={()=>setShowAddGroup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat; 