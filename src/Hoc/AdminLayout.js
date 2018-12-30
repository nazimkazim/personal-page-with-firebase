import React from 'react';
import AdminNav from '../Components/admin/nav/AdminNav';

const AdminLayout = props => {
  return (
    <div className="columns">
      <div className="column is-one-quarter">
        <AdminNav />
      </div>
      <div className="column">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
