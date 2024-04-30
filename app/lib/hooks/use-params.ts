import { useSearchParams } from 'next/navigation'

export default function useParams<T extends string>({
  key,
  defaultValue,
  values,
}: {
  key: string
  defaultValue?: T
  values: T[]
}): [T, (param: T) => void] {
  const searchParams = useSearchParams();
  const param = searchParams.get(key) as T
  const value =
    typeof param === 'string' && values.includes(param)
      ? param
      : defaultValue ?? values[0]

  const setParam = (param: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, param)
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  return [value, setParam]
}
