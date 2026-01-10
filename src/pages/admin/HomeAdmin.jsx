import React, { useEffect, useState } from "react";
import { FaBook, FaUsers } from "react-icons/fa";
import Card from "../../components/Card";
import { GiDress } from "react-icons/gi";

import { useGetAllSareeQuery, useGetAllUsersQuery } from "../../redux/state";

const HomeAdmin = () => {
  const [userLength, setUserLength] = useState(0);
  const [premiumSaree, setPremiumSaree] = useState(0);

  // ✅ RTK Query (correct usage)
  const { data: userData } = useGetAllUsersQuery();
const { data: sareeData } = useGetAllSareeQuery();

useEffect(() => {
  if (userData?.success) {
    setUserLength(userData.users.length);
  }

  if (sareeData?.success) {
    setPremiumSaree(sareeData.saree.length);
  }
}, [userData, sareeData]);




  return (
    <div className="p-5">
      <div className="flex gap-5 flex-wrap">
        <Card
          length={userLength}
          title="Total Login Users"
          router="/admin/users"
          icon={<FaUsers size={28} />}
        />

        <Card
          length={premiumSaree}
          title="Total Premium Sarees"
          router="/admin/allItems"
          icon={<GiDress size={28} />}
        />
      </div>
    </div>
  );
};

export default HomeAdmin;
