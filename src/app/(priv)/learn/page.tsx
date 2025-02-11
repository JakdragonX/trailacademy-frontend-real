export default function LearnPage() {
    return (
      <div className="min-h-screen bg-[#FAF6F1] text-[#2D4F1E] p-8">
        <h1 className="text-4xl font-bold">Learn Domain Test Page</h1>
        <p className="mt-4">If you can see this, the learn subdomain routing is working!</p>
        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <pre>
            {`Current URL: ${typeof window !== 'undefined' ? window.location.href : 'Server Side'}`}
          </pre>
        </div>
      </div>
    )
  }