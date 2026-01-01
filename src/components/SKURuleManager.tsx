import React, { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { SKUReplacementRule } from "../hooks/useSortPdf";

interface SKURuleManagerProps {
    /** Initial rules (empty by default - users must define their own) */
    initialRules?: SKUReplacementRule[];
    /** Callback when rules are updated */
    onRulesChange: (rules: SKUReplacementRule[]) => void;
    /** Optional custom styling */
    className?: string;
}

export function SKURuleManager({
    initialRules = [],
    onRulesChange,
    className = "",
}: SKURuleManagerProps) {
    const [rules, setRules] = useState<SKUReplacementRule[]>(initialRules);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleAddRule = () => {
        const newRules = [...rules, { from: "", to: "", caseSensitive: true }];
        setRules(newRules);
        onRulesChange(newRules);
    };

    const handleRemoveRule = (index: number) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
        onRulesChange(newRules);
    };

    const handleUpdateRule = (
        index: number,
        field: keyof SKUReplacementRule,
        value: any
    ) => {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], [field]: value };
        setRules(newRules);
        onRulesChange(newRules);
    };



    return (
        <div className={`space-y-4 ${className}`}>
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900">
                    SKU Replacement Rules
                </h3>
                <p className="text-sm text-gray-600">
                    Rules automatically save as you edit them
                </p>
            </div>

            {/* Rules List */}
            <div className="space-y-3">
                {rules.length === 0 && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                        No replacement rules defined. Click &quot;Add Rule&quot; to get started.
                    </div>
                )}

                {rules.map((rule, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex gap-3 items-start">
                            {/* Rule Number */}
                            <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-semibold text-sm flex-shrink-0">
                                {index + 1}
                            </div>

                            {/* Rule Fields */}
                            <div className="flex-1 space-y-3">
                                {/* Main Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Replace From (Pattern)
                                        </label>
                                        <input
                                            type="text"
                                            value={rule.from}
                                            onChange={(e) =>
                                                handleUpdateRule(index, "from", e.target.value)
                                            }
                                            placeholder="e.g., seller1-, ACC-"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                            Replace To (Main Pattern)
                                        </label>
                                        <input
                                            type="text"
                                            value={rule.to}
                                            onChange={(e) =>
                                                handleUpdateRule(index, "to", e.target.value)
                                            }
                                            placeholder="e.g., main-, MAIN-"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                {rule.from && rule.to && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-md p-2 text-sm">
                                        <span className="text-gray-600">Example: </span>
                                        <code className="bg-white px-2 py-1 rounded text-red-600">
                                            {rule.from}ABC123
                                        </code>
                                        <span className="mx-2">→</span>
                                        <code className="bg-white px-2 py-1 rounded text-green-600">
                                            {rule.to}ABC123
                                        </code>
                                    </div>
                                )}

                                {/* Advanced Options */}
                                {showAdvanced && (
                                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-200">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={rule.useRegex || false}
                                                onChange={(e) =>
                                                    handleUpdateRule(index, "useRegex", e.target.checked)
                                                }
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                            />
                                            <span className="text-gray-700">Use Regex Pattern</span>
                                        </label>

                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={rule.caseSensitive ?? true}
                                                onChange={(e) =>
                                                    handleUpdateRule(
                                                        index,
                                                        "caseSensitive",
                                                        e.target.checked
                                                    )
                                                }
                                                className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                            />
                                            <span className="text-gray-700">Case Sensitive</span>
                                        </label>
                                    </div>
                                )}
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleRemoveRule(index)}
                                className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-md transition flex-shrink-0"
                                title="Remove this rule"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="text-sm text-indigo-600 hover:text-indigo-800 underline"
                >
                    {showAdvanced ? "Hide" : "Show"} Advanced Options
                </button>

                <button
                    onClick={handleAddRule}
                    className="px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-md flex items-center gap-2 transition shadow-sm hover:shadow-md"
                >
                    <Plus className="w-4 h-4" />
                    Add Rule
                </button>
            </div>

            {/* Help Text */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
                <p className="font-semibold text-blue-900 mb-2">💡 Quick Guide:</p>
                <ul className="space-y-1 text-blue-800 list-disc list-inside">
                    <li>
                        <strong>Replace From:</strong> The pattern in your other accounts&apos;
                        SKUs (e.g., &quot;seller2-&quot;, &quot;ACC1-&quot;)
                    </li>
                    <li>
                        <strong>Replace To:</strong> Your main account&apos;s pattern (e.g.,
                        &quot;main-&quot;, &quot;MASTER-&quot;)
                    </li>
                    <li>All matching SKUs will be normalized to sort together</li>
                    <li>
                        Use &quot;Save Rules&quot; to remember your configuration for next time
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SKURuleManager;
