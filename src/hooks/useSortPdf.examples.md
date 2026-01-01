# useSortPdf Hook - Multi-Account SKU Normalization Examples

## Overview

The `useSort` hook now supports flexible multi-account SKU normalization. This allows you to:
- Replace SKU patterns from multiple accounts with a main account pattern
- Define custom replacement rules
- Support unlimited number of accounts
- Use simple string matching or regex patterns

## Basic Usage

### Example 1: Default Usage (Backward Compatible)

```typescript
import useSort from "@/hooks/useSortPdf";

function MyComponent() {
  // Default: Normalizes "zz-" and "gg-" to "hh-" for MEESHO
  const { reorderPdf, sortedPages, isLoading, progress } = useSort("MEESHO");
  
  // Use the hook as before...
}
```

### Example 2: Multiple Accounts (3+ Accounts)

```typescript
import useSort, { SKUReplacementRule } from "@/hooks/useSortPdf";

function MyComponent() {
  // Define replacement rules for 5 different accounts
  const replacementRules: SKUReplacementRule[] = [
    { from: "account1-", to: "main-" },    // Account 1 → Main
    { from: "account2-", to: "main-" },    // Account 2 → Main
    { from: "account3-", to: "main-" },    // Account 3 → Main
    { from: "account4-", to: "main-" },    // Account 4 → Main
    { from: "zz-", to: "main-" },          // Legacy account → Main
  ];

  const { reorderPdf } = useSort("MEESHO", {
    enableNormalization: true,
    replacementRules,
  });
  
  // SKU "account1-ABC123" → "main-ABC123"
  // SKU "account2-ABC123" → "main-ABC123"
  // SKU "account3-ABC123" → "main-ABC123"
  // All will be sorted together!
}
```

### Example 3: Suffix Replacement

```typescript
const replacementRules: SKUReplacementRule[] = [
  { from: "-A", to: "-MAIN" },    // Replace suffix
  { from: "-B", to: "-MAIN" },
  { from: "-C", to: "-MAIN" },
];

// SKU "ABC123-A" → "ABC123-MAIN"
// SKU "ABC123-B" → "ABC123-MAIN"
// SKU "ABC123-C" → "ABC123-MAIN"
```

### Example 4: Middle Pattern Replacement

```typescript
const replacementRules: SKUReplacementRule[] = [
  { from: "SELLER1", to: "MAIN" },
  { from: "SELLER2", to: "MAIN" },
  { from: "SELLER3", to: "MAIN" },
];

// SKU "ABC-SELLER1-123" → "ABC-MAIN-123"
// SKU "ABC-SELLER2-123" → "ABC-MAIN-123"
// SKU "ABC-SELLER3-123" → "ABC-MAIN-123"
```

### Example 5: Case-Insensitive Replacement

```typescript
const replacementRules: SKUReplacementRule[] = [
  { from: "alt", to: "MAIN", caseSensitive: false },
];

// SKU "ALT-123" → "MAIN-123"
// SKU "alt-123" → "MAIN-123"
// SKU "Alt-123" → "MAIN-123"
```

### Example 6: Advanced Regex Patterns

```typescript
const replacementRules: SKUReplacementRule[] = [
  // Replace any account prefix (acc1-, acc2-, acc3-, etc.)
  { from: "^acc\\d+-", to: "main-", useRegex: true },
  
  // Replace any single letter suffix
  { from: "-[A-Z]$", to: "-MAIN", useRegex: true },
];

// SKU "acc1-ABC123" → "main-ABC123"
// SKU "acc2-ABC123" → "main-ABC123"
// SKU "acc99-ABC123" → "main-ABC123"
// SKU "XYZ-A" → "XYZ-MAIN"
```

### Example 7: Complete E-commerce Setup

```typescript
import useSort, { SKUReplacementRule } from "@/hooks/useSortPdf";
import { useState } from "react";

function MeeshoSortTool() {
  // User can define their own rules
  const [replacementRules, setReplacementRules] = useState<SKUReplacementRule[]>([
    { from: "meesho-seller1-", to: "main-" },
    { from: "meesho-seller2-", to: "main-" },
    { from: "meesho-seller3-", to: "main-" },
  ]);

  const { reorderPdf, sortedPages, isLoading, progress } = useSort("MEESHO", {
    enableNormalization: true,
    replacementRules,
  });

  const handleFileUpload = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const sortedPdf = await reorderPdf(buffer, (p) => {
      console.log(`Progress: ${p}%`);
    });
    
    if (sortedPdf) {
      // Download sorted PDF
      const blob = new Blob([sortedPdf], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sorted-labels.pdf";
      a.click();
    }
  };

  // Add UI to allow users to add/edit replacement rules
  const addRule = () => {
    setReplacementRules([
      ...replacementRules,
      { from: "", to: "main-" },
    ]);
  };

  return (
    <div>
      <h2>SKU Normalization Rules</h2>
      {replacementRules.map((rule, index) => (
        <div key={index}>
          <input
            value={rule.from}
            onChange={(e) => {
              const updated = [...replacementRules];
              updated[index] = { ...rule, from: e.target.value };
              setReplacementRules(updated);
            }}
            placeholder="Replace from..."
          />
          <input
            value={rule.to}
            onChange={(e) => {
              const updated = [...replacementRules];
              updated[index] = { ...rule, to: e.target.value };
              setReplacementRules(updated);
            }}
            placeholder="Replace to..."
          />
        </div>
      ))}
      <button onClick={addRule}>+ Add Rule</button>
      
      <input type="file" onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleFileUpload(file);
      }} />
    </div>
  );
}
```

## Real-World Use Cases

### Use Case 1: Meesho Multi-Seller Account

**Scenario**: You have 5 Meesho seller accounts with different SKU prefixes
- Account 1: `MS1-ProductName`
- Account 2: `MS2-ProductName`
- Account 3: `MS3-ProductName`
- Account 4: `MS4-ProductName`
- Main Account: `MAIN-ProductName`

**Solution**:
```typescript
const rules = [
  { from: "MS1-", to: "MAIN-" },
  { from: "MS2-", to: "MAIN-" },
  { from: "MS3-", to: "MAIN-" },
  { from: "MS4-", to: "MAIN-" },
];
```

### Use Case 2: Different Color/Size Variants

**Scenario**: Different accounts use different color codes
- Account 1: `Product-BLK-M` (Black, Medium)
- Account 2: `Product-BK-M`
- Account 3: `Product-B-M`
- Main: `Product-BLACK-M`

**Solution**:
```typescript
const rules = [
  { from: "-BLK-", to: "-BLACK-" },
  { from: "-BK-", to: "-BLACK-" },
  { from: "-B-", to: "-BLACK-" },
];
```

### Use Case 3: Dynamic User Input

Allow users to define their own rules via a form:

```typescript
function DynamicRulesForm() {
  const [rules, setRules] = useState<SKUReplacementRule[]>([]);
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const from = formData.get("from") as string;
      const to = formData.get("to") as string;
      
      setRules([...rules, { from, to }]);
    }}>
      <input name="from" placeholder="Replace from (e.g., seller2-)" />
      <input name="to" placeholder="Replace to (e.g., main-)" />
      <button type="submit">Add Rule</button>
      
      <div>
        <h3>Current Rules:</h3>
        {rules.map((rule, i) => (
          <div key={i}>{rule.from} → {rule.to}</div>
        ))}
      </div>
    </form>
  );
}
```

## API Reference

### `useSort(sortFor, options?)`

#### Parameters

- **sortFor**: `"MEESHO" | "FLIPKART"` - Platform type
- **options** (optional): Configuration object
  - **enableNormalization**: `boolean` - Enable/disable SKU normalization (default: `true` for MEESHO)
  - **replacementRules**: `SKUReplacementRule[]` - Array of replacement rules

#### Returns

- **sortedPages**: Sorted pages with normalized SKUs
- **isLoading**: Loading state
- **error**: Error state
- **reorderPdf**: Function to process and reorder PDF
- **progress**: Progress percentage (0-100)

### `SKUReplacementRule` Interface

```typescript
interface SKUReplacementRule {
  from: string;           // Pattern to search for
  to: string;             // Pattern to replace with
  useRegex?: boolean;     // Use regex matching (default: false)
  caseSensitive?: boolean; // Case sensitive (default: true)
}
```

## Migration Guide

### From Old Version to New Version

**Old Code** (hardcoded 2 accounts):
```typescript
const { reorderPdf } = useSort("MEESHO");
// Only normalized "zz-" and "gg-" to "hh-"
```

**New Code** (flexible multi-account):
```typescript
// Option 1: Use defaults (same as before)
const { reorderPdf } = useSort("MEESHO");

// Option 2: Define your own rules
const { reorderPdf } = useSort("MEESHO", {
  replacementRules: [
    { from: "zz-", to: "hh-" },
    { from: "gg-", to: "hh-" },
    { from: "xx-", to: "hh-" },  // Add more accounts!
    { from: "yy-", to: "hh-" },
  ],
});
```

## Best Practices

1. **Order matters**: Rules are applied sequentially, so order them from most specific to least specific
2. **Test thoroughly**: Test with sample PDFs before processing large batches
3. **Use regex carefully**: Regex is powerful but can be slow for large documents
4. **Backup originals**: Always keep original PDFs before sorting
5. **Start simple**: Begin with simple string replacement before moving to regex

## Troubleshooting

### Q: My SKUs aren't being normalized
**A**: Check that:
- `enableNormalization` is set to `true`
- Your `from` pattern exactly matches the SKU pattern in your PDFs
- Rules are in the correct order

### Q: Some SKUs are being replaced incorrectly
**A**: Your `from` pattern might be too broad. Use more specific patterns or regex with anchors (`^` for start, `$` for end)

### Q: Performance is slow
**A**: 
- Avoid using regex if simple string replacement works
- Minimize the number of rules
- Use more specific patterns to reduce unnecessary replacements
