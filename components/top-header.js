import { useRouter } from 'next/router'
import { Form, Select } from './form'

const USER_SORTS = ['stacked', 'spent', 'comments', 'posts', 'referrals']
const ITEM_SORTS = ['votes', 'comments', 'sats']

export default function TopHeader ({ cat }) {
  const router = useRouter()

  const top = async values => {
    const { what, when, ...query } = values

    if (what === 'cowboys') {
      await router.push({
        pathname: `/top/${what}`
      })
      return
    }

    if (typeof query.sort !== 'undefined') {
      if (query.sort === '' ||
          (what === 'users' && !USER_SORTS.includes(query.sort)) ||
          (what !== 'users' && !ITEM_SORTS.includes(query.sort))) {
        delete query.sort
      }
    }

    await router.push({
      pathname: `/top/${what}/${when || 'day'}`,
      query
    })
  }

  return (
    <div className='d-flex'>
      <Form
        className='mr-auto'
        initial={{
          what: cat,
          sort: router.query.sort || '',
          when: router.query.when || ''
        }}
        onSubmit={top}
      >
        <div className='text-muted font-weight-bold my-3 d-flex align-items-center'>
          top
          <Select
            groupClassName='mx-2 mb-0'
            onChange={(formik, e) => top({ ...formik?.values, what: e.target.value })}
            name='what'
            size='sm'
            items={['posts', 'comments', 'users', 'cowboys']}
          />
          {cat !== 'cowboys' &&
            <>
              by
              <Select
                groupClassName='mx-2 mb-0'
                onChange={(formik, e) => top({ ...formik?.values, sort: e.target.value })}
                name='sort'
                size='sm'
                items={cat === 'users' ? USER_SORTS : ITEM_SORTS}
              />
              for
              <Select
                groupClassName='mb-0 ml-2'
                onChange={(formik, e) => top({ ...formik?.values, when: e.target.value })}
                name='when'
                size='sm'
                items={['day', 'week', 'month', 'year', 'forever']}
              />
            </>}

        </div>
      </Form>
    </div>
  )
}
