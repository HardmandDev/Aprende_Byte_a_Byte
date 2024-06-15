import { HandCoins } from 'lucide-react'
import {SignUpForm} from '../components/guest/SignUp'
import React  from 'react'


const form = useForm()

function RegisterForm() {

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>This is your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>}
