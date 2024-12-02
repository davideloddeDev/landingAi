import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [launchUsers, setLaunchUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    byPlan: {
      free: 0,
      pro: 0,
      business: 0
    }
  });

  useEffect(() => {
    const fetchLaunchUsers = async () => {
      const q = query(
        collection(db, 'subscriptions'),
        where('isLaunchOffer', '==', true)
      );
      
      const querySnapshot = await getDocs(q);
      const users = [];
      const planStats = { free: 0, pro: 0, business: 0 };
      
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        users.push({ id: doc.id, ...userData });
        planStats[userData.plan]++;
      });

      setLaunchUsers(users);
      setStats({
        total: users.length,
        byPlan: planStats
      });
    };

    fetchLaunchUsers();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Amministratore</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Utenti Totali</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Piano Base</h3>
          <p className="stat-number">{stats.byPlan.free}</p>
        </div>
        <div className="stat-card">
          <h3>Piano Pro</h3>
          <p className="stat-number">{stats.byPlan.pro}</p>
        </div>
        <div className="stat-card">
          <h3>Piano Business</h3>
          <p className="stat-number">{stats.byPlan.business}</p>
        </div>
      </div>

      <div className="users-table">
        <h2>Utenti Offerta Lancio</h2>
        <table>
          <thead>
            <tr>
              <th>ID Utente</th>
              <th>Piano</th>
              <th>Data Attivazione</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {launchUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.plan}</td>
                <td>{new Date(user.launchOfferActivatedAt).toLocaleDateString()}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
