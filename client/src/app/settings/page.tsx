import ProtectedRoute from "@/routes/protectedRoute";

export default function SettingsPage() {
    return (
        <ProtectedRoute>
            <main>
                <h1>teste</h1>
            </main>
        </ProtectedRoute>
    )
}