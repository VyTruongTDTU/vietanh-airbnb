"use client";

import { useState } from "react";

export default function TestLoginPage() {
      const [results, setResults] = useState<any[]>([]);
      const [loading, setLoading] = useState(false);

      const testLogin = async () => {
            setLoading(true);
            try {
                  const response = await fetch("/api/auth/login", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                              email: "test1@gmail.com",
                              password: "0123456789"
                        }),
                  });

                  const data = await response.json();

                  setResults(prev => [...prev, {
                        type: "Login Test",
                        status: response.status,
                        response: data,
                        timestamp: new Date().toLocaleTimeString()
                  }]);

                  if (response.ok) {
                        // Test profile endpoint
                        const profileResponse = await fetch("/api/auth/profile", {
                              headers: {
                                    Authorization: `Bearer ${data.token}`,
                              },
                        });

                        const profileData = await profileResponse.json();

                        setResults(prev => [...prev, {
                              type: "Profile Test",
                              status: profileResponse.status,
                              response: profileData,
                              timestamp: new Date().toLocaleTimeString()
                        }]);
                  }

            } catch (error) {
                  setResults(prev => [...prev, {
                        type: "Error",
                        status: "ERROR",
                        response: { error: error instanceof Error ? error.message : "Unknown error" },
                        timestamp: new Date().toLocaleTimeString()
                  }]);
            }
            setLoading(false);
      };

      const testProfile = async () => {
            setLoading(true);
            try {
                  const token = localStorage.getItem("token");
                  const response = await fetch("/api/auth/profile", {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });

                  const data = await response.json();

                  setResults(prev => [...prev, {
                        type: "Profile with Stored Token",
                        status: response.status,
                        response: data,
                        timestamp: new Date().toLocaleTimeString()
                  }]);

            } catch (error) {
                  setResults(prev => [...prev, {
                        type: "Profile Error",
                        status: "ERROR",
                        response: { error: error instanceof Error ? error.message : "Unknown error" },
                        timestamp: new Date().toLocaleTimeString()
                  }]);
            }
            setLoading(false);
      };

      return (
            <div className="container mx-auto p-8 max-w-4xl">
                  <h1 className="text-3xl font-bold mb-8">Test Login & Profile</h1>

                  <div className="grid gap-4 mb-8">
                        <button
                              onClick={testLogin}
                              disabled={loading}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                              {loading ? "Testing..." : "Test Login (test1@gmail.com)"}
                        </button>

                        <button
                              onClick={testProfile}
                              disabled={loading}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                              {loading ? "Testing..." : "Test Profile (with stored token)"}
                        </button>

                        <button
                              onClick={() => setResults([])}
                              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                              Clear Results
                        </button>
                  </div>

                  <div className="space-y-4">
                        <h2 className="text-2xl font-semibold">Test Results</h2>
                        {results.map((result, index) => (
                              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex justify-between items-center mb-2">
                                          <h3 className="font-semibold">{result.type}</h3>
                                          <span className="text-sm text-gray-500">{result.timestamp}</span>
                                    </div>
                                    <p className={`text-sm mb-2 ${result.status === 200 ? "text-green-600" : "text-red-600"
                                          }`}>
                                          Status: {result.status}
                                    </p>
                                    <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
                                          {JSON.stringify(result.response, null, 2)}
                                    </pre>
                              </div>
                        ))}
                  </div>
            </div>
      );
}
