import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialGroups = [
  { id: 'chat', name: 'Chat' },
  { id: 'updates', name: 'Updates' },
];

const Groups = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const navigate = useNavigate();

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    const newId = newGroupName.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    setGroups([...groups, { id: newId, name: newGroupName }]);
    setShowAddGroup(false);
    setNewGroupName('');
  };

  return (
    <div style={{minHeight:'100vh', background:'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-start', paddingTop:'60px'}}>
      <div style={{width:'100%', maxWidth:420, background:'#fff', borderRadius:18, boxShadow:'0 8px 32px 0 rgba(31,38,135,0.13)', padding:'2.5em 2em 2em 2em', marginTop:0, position:'relative'}}>
        <button onClick={()=>navigate('/chat')} style={{position:'absolute', left:20, top:20, background:'none', border:'none', color:'#ff5e62', fontWeight:600, fontSize:'1em', cursor:'pointer'}}>&larr; Back</button>
        <h2 style={{textAlign:'center', color:'#ff5e62', fontWeight:700, marginBottom:'2.5em'}}>Groups</h2>
        <button onClick={()=>setShowAddGroup(true)} style={{width:'100%', background:'linear-gradient(90deg,#ff5e62 0%,#ff9966 100%)', color:'#fff', border:'none', borderRadius:12, fontWeight:700, fontSize:'1.2em', padding:'1em', boxShadow:'0 2px 8px rgba(255,94,98,0.10)', cursor:'pointer'}}>+ Add Group</button>
      </div>
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

export default Groups; 