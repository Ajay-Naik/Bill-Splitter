# Bill Splitter

A React web app to split restaurant bills fairly. Scan a receipt with AI or enter items manually, assign who ordered what, and get an instant split summary.

**Live demo:** https://bill-splitter-brown.vercel.app

---

## Features

- **AI receipt scanner** — upload a photo of your bill; Tesseract OCR extracts the text, Gemini API parses items and prices automatically
- **Manual entry** — add items, quantities, and rates by hand
- **Item-based splitting** — assign each item to specific people; unselected people don't pay for that item
- **Tip and tax distribution** — split evenly across all people
- **Split summary** — shows exactly how much each person owes
- **Share summary** — share the breakdown with your group

---

## Tech stack

- React + Vite
- React Router
- Tesseract.js (OCR)
- Gemini API (receipt parsing)
- Bootstrap + custom CSS
- Deployed on Vercel

---

## Getting started

```bash
git clone https://github.com/Ajay-Naik/Bill-Splitter.git
cd Bill-Splitter/Bill_splitter
npm install
```

Create a `.env` file in the `Bill_splitter` folder:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

Get a free API key at [aistudio.google.com](https://aistudio.google.com)

```bash
npm run dev
```

---

## Project structure

```
Bill_splitter/
├── src/
│   ├── pages/
│   │   ├── Home.jsx        # Landing page
│   │   ├── Scanner.jsx     # AI receipt scanner
│   │   ├── Manual.jsx      # Manual bill entry
│   │   ├── Person.jsx      # Assign items to people
│   │   └── Summary.jsx     # Split summary
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Grid.jsx
│   │   ├── NewItem.jsx
│   │   ├── input.jsx       # File drop zone
│   │   └── BackButton.jsx
│   └── Api/
│       └── BillParser.jsx  # Gemini API integration
```

---

## How it works

1. Upload a receipt image or enter items manually
2. Add the people splitting the bill
3. Tap each person's name under the items they ordered
4. Hit Continue — the app calculates each person's share including their portion of tip and tax
5. Share the summary with your group

---

## Future plans

- Camera capture on mobile
- Save and revisit past splits
- Export summary as PDF
- Support for multiple currencies
