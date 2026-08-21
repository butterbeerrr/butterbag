import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/users";

import UserHeader from "../../components/admin/users/UserHeader";
import UserOverview from "../../components/admin/users/UserOverview";
import UserFilters from "../../components/admin/users/UserFilters";
import UserTable from "../../components/admin/users/UserTable";
import CashierModal from "../../components/admin/users/CashierModal";
import DeleteCashier from "../../components/admin/users/DeleteCashier";
import AdminLayout from "../../components/admin/AdminLayout";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedCashier, setSelectedCashier] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [cashierToDelete, setCashierToDelete] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data.users);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {

      if(user.role=== "admin")return false;

      const searchValue = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleAddCashier = () => {
    setSelectedCashier(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleEditCashier = (cashier) => {
    setSelectedCashier(cashier);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleSubmitCashier = async (data) => {
    try {
      setError("");

      if (modalMode === "add") {
        await createUser({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "cashier",
        });
      } else {
        await updateUser(selectedCashier.id, {
          name: data.name,
          email: data.email,
          ...(data.password
            ? { password: data.password }
            : {}),
          role: "cashier",
        });
      }

      await loadUsers();

      setModalOpen(false);
      setSelectedCashier(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to save cashier.");
    }
  };

  const handleDeleteCashier = (cashier) => {
    setCashierToDelete(cashier);
    setDeleteOpen(true);
  };

  const confirmDeleteCashier = async () => {
    if (!cashierToDelete) return;

    try {
      setError("");

      await deleteUser(cashierToDelete.id);

      await loadUsers();

      setDeleteOpen(false);
      setCashierToDelete(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to delete cashier.");
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#F5F0E6]">

        <UserHeader
          onAddCashier={handleAddCashier}
        />

        <main className="px-4 py-6 md:px-10 md:py-8">
          <div className="mx-auto max-w-7xl">

            {error && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <UserOverview users={users} />

            <div className="mt-6">
              <UserFilters
                search={search}
                setSearch={setSearch}
                roleFilter={roleFilter}
                setRoleFilter={setRoleFilter}
              />
            </div>

            <div className="mt-5">
              {loading ? (
                <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
                  Loading users...
                </div>
              ) : (
                <UserTable
                  users={filteredUsers}
                  onEditCashier={handleEditCashier}
                  onDeleteCashier={handleDeleteCashier}
                />
              )}
            </div>

          </div>
        </main>

        <CashierModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedCashier(null);
          }}
          mode={modalMode}
          cashier={selectedCashier}
          onSubmit={handleSubmitCashier}
        />

        <DeleteCashier
          isOpen={deleteOpen}
          onClose={() => {
            setDeleteOpen(false);
            setCashierToDelete(null);
          }}
          cashier={cashierToDelete}
          onConfirm={confirmDeleteCashier}
        />

      </div>
    </AdminLayout>
  );
}

export default UserManagement;