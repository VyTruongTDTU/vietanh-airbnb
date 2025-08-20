"use client";
import { useState } from "react";

export default function TestEnrollmentPage() {
      const [results, setResults] = useState<any[]>([]);
      const [loading, setLoading] = useState(false);

      const testScenarios = [
            {
                  name: "New User Enrollment",
                  data: {
                        courseId: "676eb22e40ae4a62c8b5b5b5", // Use any existing course ID
                        title: "Test Course",
                        fullname: "Test User New",
                        email: "newuser@test.com",
                        phone: "0987654321",
                        price: 100000
                  }
            },
            {
                  name: "Existing User - New Course",
                  data: {
                        courseId: "676eb22e40ae4a62c8b5b5b6", // Different course ID
                        title: "Another Test Course",
                        fullname: "Test User Existing",
                        email: "newuser@test.com", // Same email as above
                        phone: "0987654321",
                        price: 150000
                  }
            },
            {
                  name: "Duplicate Enrollment",
                  data: {
                        courseId: "676eb22e40ae4a62c8b5b5b5", // Same course as first test
                        title: "Test Course",
                        fullname: "Test User Duplicate",
                        email: "newuser@test.com", // Same email and course
                        phone: "0987654321",
                        price: 100000
                  }
            }
      ];

      const runTest = async (scenario: any, index: number) => {
            setLoading(true);
            try {
                  const res = await fetch("/api/enrollments", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(scenario.data),
                  });

                  const result = await res.json();

                  setResults(prev => [...prev, {
                        test: scenario.name,
                        status: res.status,
                        response: result,
                        timestamp: new Date().toLocaleTimeString()
                  }]);

            } catch (err) {
                  setResults(prev => [...prev, {
                        test: scenario.name,
                        status: "ERROR",
                        response: { error: err instanceof Error ? err.message : "Unknown error" },
                        timestamp: new Date().toLocaleTimeString()
                  }]);
            }
            setLoading(false);
      };

      const clearResults = () => setResults([]);

      return (
            <div className="container mx-auto p-8 max-w-4xl">
                  <h1 className="text-3xl font-bold mb-8">Test Enrollment Flow</h1>

                  <div className="grid gap-4 mb-8">
                        {testScenarios.map((scenario, index) => (
                              <div key={index} className="border rounded-lg p-4">
                                    <h3 className="font-semibold mb-2">{scenario.name}</h3>
                                    <p className="text-sm text-gray-600 mb-3">
                                          Email: {scenario.data.email} | Course: {scenario.data.title}
                                    </p>
                                    <button
                                          onClick={() => runTest(scenario, index)}
                                          disabled={loading}
                                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                                    >
                                          {loading ? "Testing..." : "Run Test"}
                                    </button>
                              </div>
                        ))}
                  </div>

                  <div className="flex gap-4 mb-6">
                        <button
                              onClick={clearResults}
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
                                          <h3 className="font-semibold">{result.test}</h3>
                                          <span className="text-sm text-gray-500">{result.timestamp}</span>
                                    </div>
                                    <p className={`text-sm mb-2 ${result.status === 200 ? "text-green-600" :
                                                result.response.status === "ALREADY_ENROLLED" ? "text-orange-600" :
                                                      "text-red-600"
                                          }`}>
                                          Status: {result.status} {result.response.status && `(${result.response.status})`}
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
