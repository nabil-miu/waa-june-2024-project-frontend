import React, {useState} from 'react';
import adminService from '../services/AdminService';

const AdminActions = () => {
    const [userId, setUserId] = useState('');
    const [reportId, setReportId] = useState('');
    const [allReports, setAllReports] = useState([]);
    const [reportsById, setReportsById] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeactivateUser = async () => {
        try {
            setLoading(true);
            await adminService.deactivateUser(userId);
            alert("User deactivated successfully");
        } catch (error) {
            setError(error);
            console.error("Error deactivating user:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleActivateUser = async () => {
        try {
            setLoading(true);
            await adminService.activateUser(userId);
            alert("User activated successfully");
        } catch (error) {
            setError(error);
            console.error("Error activating user:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleGetReports = async () => {
        try {
            setLoading(true);
            const response = await adminService.getReports();
            setAllReports(response.data);
        } catch (error) {
            setError(error);
            console.error("Error getting allReports:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleGetReportById = async () => {
        try {
            setLoading(true);
            const response = await adminService.getReportById(reportId);
            setSelectedReport(response.data);
        } catch (error) {
            setError(error);
            console.error("Error getting report by id:", error.response);
        } finally {
            setLoading(false);
        }
    };

    const handleGetReportsByUser = async () => {
        try {
            setLoading(true);
            const response = await adminService.getReportsByUser(userId);
            setReportsById(response.data);
        } catch (error) {
            setError(error);
            console.error("Error getting allReports by user:", error.response);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Admin Actions</h1>
            <div>
                <h2>Deactivate User</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={handleDeactivateUser}>Deactivate User</button>
            </div>
            <div>
                <h2>Activate User</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={handleActivateUser}>Activate User</button>
            </div>
            <div>
                <h2>Get All Reports</h2>
                <button onClick={handleGetReports}>Get Reports</button>
                <ul>
                    {allReports.map(report => (
                        <li key={report.id}>
                            {report.reason}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Get Report By ID</h2>
                <input
                    type="text"
                    placeholder="Report ID"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                />
                <button onClick={handleGetReportById}>Get Report</button>
                {selectedReport && (
                    <div>
                        <h3>{selectedReport.reason}</h3>
                        <p>{selectedReport.reportDate}</p>
                        <p>Reported By: {selectedReport.reportedBy.firstName} {selectedReport.reportedBy.lastName}</p>
                    </div>
                )}
            </div>
            <div>
                <h2>Get Reports By User ID</h2>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button onClick={handleGetReportsByUser}>Get Reports By User</button>
                <ul>
                    {reportsById.map(report => (
                        <li key={report.id}>{report.reason}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminActions;
