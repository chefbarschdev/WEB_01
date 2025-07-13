export const createClient = () => ({
  from: () => ({
    insert: () => Promise.resolve({ data: null, error: null }),
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    })
  })
});
