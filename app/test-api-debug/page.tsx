"use client";

import { useState } from "react";

export default function TestApiPage() {
      const [result, setResult] = useState<any>(null);
      const [loading, setLoading] = useState(false);
      const [email, setEmail] = useState("test1@gmail.com");
      const [password, setPassword] = useState("0123456789");

      const testUserExists = async () => {
            setLoading(true);
            try {
                  const response = await fetch(`/api/enrollments/debug/user/${email}`);
                  const data = await response.json();
                  setResult({
                        type: "user-check",
                        status: response.status,
                        data
                  });
            } catch (error) {
                  setResult({
                        type: "user-check",
                        status: "error",
                        data: { error: error instanceof Error ? error.message : String(error) }
                  });
            } finally {
                  setLoading(false);
            }
      };

      const testLogin = async () => {
            setLoading(true);
            try {
                  const response = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ email, password }),
                  });
                  const data = await response.json();
                  setResult({
                        type: "login-test",
                        status: response.status,
                        data
                  });
            } catch (error) {
                  setResult({
                        type: "login-test",
                        status: "error",
                        data: { error: error instanceof Error ? error.message : String(error) }
                  });
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 py-12">
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    Test API - Debug Student Login
                              </h1>
                              <p className="text-gray-600">
                                    Test if student account exists and login works
                              </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                              <h2 className="text-xl font-semibold mb-6">Test Credentials</h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div>
                                          <div className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                          </div>
                                          <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                    </div>
                                    <div>
                                          <div className="block text-sm font-medium text-gray-700 mb-2">
                                                Password (Phone)
                                          </div>
                                          <input
                                                type="text"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                    </div>
                              </div>

                              <div className="flex space-x-4 mb-6">
                                    <button
                                          onClick={testUserExists}
                                          disabled={loading}
                                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                                    >
                                          1. Check if User Exists
                                    </button>
                                    <button
                                          onClick={testLogin}
                                          disabled={loading}
                                          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                                    >
                                          2. Test Login
                                    </button>
                              </div>

                              {loading && (
                                    <div className="text-center py-4">
                                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                                    </div>
                              )}

                              {result && (
                                    <div className="mt-6">
                                          <h3 className="text-lg font-semibold mb-4">
                                                Test Result - {result.type}
                                          </h3>
                                          <div className="bg-gray-100 rounded-lg p-4">
                                                <div className="mb-2">
                                                      <span className="font-medium">Status: </span>
                                                      {(() => {
                                                            let statusClass = "bg-red-100 text-red-800";
                                                            if (result.status === 200) {
                                                                  statusClass = "bg-green-100 text-green-800";
                                                            } else if (result.status === 404) {
                                                                  statusClass = "bg-yellow-100 text-yellow-800";
                                                            }
                                                            return (
                                                                  <span className={`px-2 py-1 rounded text-sm ${statusClass}`}>
                                                                        {result.status}
                                                                  </span>
                                                            );
                                                      })()}
                                                </div>
                                                <div>
                                                      <span className="font-medium">Response: </span>
                                                      <pre className="mt-2 bg-white p-3 rounded text-sm overflow-auto">
                                                            {JSON.stringify(result.data, null, 2)}
                                                      </pre>
                                                </div>
                                          </div>
                                    </div>
                              )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                                    Troubleshooting Guide:
                              </h3>
                              <div className="space-y-2 text-blue-800 text-sm">
                                    <div>
                                          <strong>1. Check if User Exists:</strong> First verify the user account was created in the database
                                    </div>
                                    <div>
                                          <strong>2. Test Login:</strong> Try to login with email and phone number
                                    </div>
                                    <div>
                                          <strong>Common Issues:</strong>
                                          <ul className="list-disc list-inside ml-4 mt-1">
                                                <li>Payment status not marked as "paid" - user account won't be created</li>
                                                <li>Phone number formatting - only digits should be used as password</li>
                                                <li>Wrong email format - must match exactly what was enrolled</li>
                                          </ul>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      );
}
