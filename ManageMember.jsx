import React, { useEffect, useState } from "react";
import { getMembers, deleteMember, updateMember } from "../connectAPI/callMember";

function ManageMember() {
  const [members, setMembers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (err) {
      console.error("โหลดข้อมูลล้มเหลว:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    await deleteMember(id);
    fetchMembers();
  };

  const handleEdit = (member) => {
    setEditId(member.memid);
    setEditName(member.name);
    setEditEmail(member.email);
  };

  const handleUpdate = async (id) => {
    await updateMember(id, { name: editName, email: editEmail });
    setEditId(null);
    fetchMembers();
  };

  return (
    <div>
      <h2> รายชื่อผู้ใช้</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>ชื่อ</th>
            <th>อีเมล</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memid}>
              {editId === member.memid ? (
                <>
                  <td>{member.memid}</td>
                  <td>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(member.memid)}>บันทึก</button>
                    <button onClick={() => setEditId(null)}>ยกเลิก</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{member.memid}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <button onClick={() => handleEdit(member)}>แก้ไข</button>
                    <button onClick={() => handleDelete(member.memid)}>ลบ</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMember;
