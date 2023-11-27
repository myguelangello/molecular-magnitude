import Fuse from 'fuse.js'
import { useState } from 'react'

const options = {
  keys: ['data.title', 'data.description', 'slug'],
  includeMatches: true,
  minMatchCharLength: 2,
}

export default function Search({ searchList }) {
  const [query, setQuery] = useState('')

  const fuse = new Fuse(searchList, options)
  const posts = fuse
    .search(query)
    .map(result => result.item)
    .slice(0, 5)

  function handleOnSearch({ target = {} }) {
    const { value } = target
    setQuery(() => value)
  }

  return (
    <>
      <label htmlFor="search">Search posts</label>
      <input
        id="search"
        type="text"
        placeholder="Search by posts here..."
        value={query}
        onChange={handleOnSearch}
      />

      {query.length > 1 && (
        <p>Found {posts.length} {posts.length == 1 ? 'result' : 'results'} for '{query}'</p>
      )}

      <ul>
        {posts && posts.map(post => (
          <li key={post.slug}>
            {post.data.title}
          </li>
        ))}
      </ul>
    </>
  )
}
