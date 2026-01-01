# Quick Reference: localStorage Auto-Persistence

## Storage Key
```
meesho-sku-replacement-rules
```

## Auto-Behavior

### ✅ Auto-Load (On Page Load)
- **Where:** `MeeshoEcomList.tsx` (lines 42-62)
- **When:** Component mounts
- **What:** Loads saved rules from localStorage
- **Console:** `✅ Loaded 3 SKU rule(s) from localStorage`

### ✅ Auto-Save (On Rule Change)
- **Where:** `MeeshoEcomList.tsx` (lines 64-76)
- **When:** Any rule is added, edited, or removed
- **What:** Saves all rules to localStorage
- **Console:** `💾 Auto-saved 3 SKU rule(s) to localStorage`

## Data Structure

```json
[
  {
    "from": "seller1-",
    "to": "main-",
    "caseSensitive": true
  },
  {
    "from": "seller2-",
    "to": "main-"
  }
]
```

## User Flow

```
1. User opens Meesho page
   ↓
2. Rules auto-load from localStorage
   ↓
3. User sees "(X rules active)" in UI
   ↓
4. User edits rules
   ↓
5. Rules auto-save to localStorage
   ↓
6. Next visit: Rules still there!
```

## Where Used

| File | Purpose |
|------|---------|
| `MeeshoEcomList.tsx` | Auto-load & auto-save |
| `SKURuleManager.tsx` | Manual save/load buttons |

## Quick Test

```javascript
// View in browser console
localStorage.getItem('meesho-sku-replacement-rules')

// Clear if needed
localStorage.removeItem('meesho-sku-replacement-rules')
```

## Full Documentation
See [`docs/localStorage-usage.md`](file:///e:/VIVEK/froentend/private/pdf_things_next/docs/localStorage-usage.md) for complete details.
