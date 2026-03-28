import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, BookOpen, Upload, Download } from "lucide-react";
import { mockBooks } from "@/lib/mockData";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

const BookManagement = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockBooks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-heading text-3xl font-black">Book Management</h1>
        <div className="flex gap-2">
          <button className="brutal-btn bg-background rounded-md text-sm font-heading flex items-center gap-1">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="brutal-btn bg-background rounded-md text-sm font-heading flex items-center gap-1">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setShowAddModal(true)} className="brutal-btn bg-primary text-primary-foreground rounded-md text-sm font-heading flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Book
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books..." className="brutal-input w-full pl-11 rounded-md" />
      </div>

      {/* Table */}
      <div className="brutal-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="brutal-border border-t-0 border-x-0 bg-muted">
                <th className="text-left p-3 font-heading text-sm">Title</th>
                <th className="text-left p-3 font-heading text-sm hidden sm:table-cell">Author</th>
                <th className="text-left p-3 font-heading text-sm hidden md:table-cell">ISBN</th>
                <th className="text-left p-3 font-heading text-sm">Copies</th>
                <th className="text-left p-3 font-heading text-sm hidden lg:table-cell">Location</th>
                <th className="text-left p-3 font-heading text-sm">Actions</th>
              </tr>
            </thead>
            <motion.tbody variants={container} initial="hidden" animate="show">
              {filtered.map((book) => (
                <motion.tr key={book.id} variants={item} className="brutal-border border-x-0 border-b-0 last:border-b-0 hover:bg-muted/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-10 bg-muted brutal-border rounded flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-heading font-bold text-sm truncate max-w-[150px]">{book.title}</span>
                    </div>
                  </td>
                  <td className="p-3 text-sm hidden sm:table-cell">{book.author}</td>
                  <td className="p-3 text-xs text-muted-foreground hidden md:table-cell font-mono">{book.isbn}</td>
                  <td className="p-3">
                    <span className={`text-sm font-bold ${book.availableCopies > 0 ? "text-success" : "text-destructive"}`}>
                      {book.availableCopies}/{book.totalCopies}
                    </span>
                  </td>
                  <td className="p-3 text-xs hidden lg:table-cell">{book.location}</td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="brutal-btn bg-background rounded-md p-1.5"><Edit className="w-4 h-4" /></button>
                      <button className="brutal-btn bg-destructive text-destructive-foreground rounded-md p-1.5"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>

      {/* Add Book Modal */}
      {showAddModal && (
        <motion.div
          className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowAddModal(false)}
        >
          <motion.div
            className="brutal-card bg-card p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto"
            initial={{ y: 50, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-heading text-2xl font-black mb-4">Add New Book</h2>
            <div className="space-y-3">
              {["Title", "Author", "ISBN", "Publisher", "Description"].map((field) => (
                <div key={field}>
                  <label className="font-heading font-bold text-sm mb-1 block">{field}</label>
                  {field === "Description" ? (
                    <textarea className="brutal-input w-full rounded-md" rows={3} placeholder={`Enter ${field.toLowerCase()}...`} />
                  ) : (
                    <input className="brutal-input w-full rounded-md" placeholder={`Enter ${field.toLowerCase()}...`} />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-heading font-bold text-sm mb-1 block">Year</label>
                  <input type="number" className="brutal-input w-full rounded-md" placeholder="2024" />
                </div>
                <div>
                  <label className="font-heading font-bold text-sm mb-1 block">Copies</label>
                  <input type="number" className="brutal-input w-full rounded-md" placeholder="1" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading flex-1">Add Book</button>
                <button onClick={() => setShowAddModal(false)} className="brutal-btn bg-background rounded-md font-heading">Cancel</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BookManagement;
