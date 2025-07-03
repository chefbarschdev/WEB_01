// Supabase Connection Test Script
// This script tests the Supabase connection and creates the waitlist table if needed

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

// Read .env.local file manually
const envContent = readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    envVars[key.trim()] = value.trim();
  }
});

const supabaseUrl = envVars.SUPABASE_URL;
const supabaseKey = envVars.SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...');
console.log('URL:', supabaseUrl);
console.log('Key (first 20 chars):', supabaseKey?.substring(0, 20) + '...');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔗 Testing basic connection...');
    
    // Test basic connection
    const { data, error } = await supabase.from('waitlist').select('count', { count: 'exact', head: true });
    
    if (error) {
      if (error.message.includes('relation "waitlist" does not exist')) {
        console.log('⚠️  Waitlist table does not exist. Creating it...');
        await createWaitlistTable();
      } else {
        console.error('❌ Connection failed:', error.message);
        return false;
      }
    } else {
      console.log('✅ Connection successful! Waitlist table exists.');
      console.log('📊 Current entries count:', data?.length || 0);
    }
    
    return true;
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
    return false;
  }
}

async function createWaitlistTable() {
  try {
    console.log('🔨 Creating waitlist table...');
    
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS waitlist (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          company_name VARCHAR(255),
          company_size VARCHAR(50),
          pain_point TEXT,
          name VARCHAR(255),
          ip_address VARCHAR(45),
          created_at TIMESTAMP DEFAULT NOW()
        );
      `
    });
    
    if (error) {
      console.error('❌ Failed to create table:', error.message);
      console.log('\n📝 Please create the table manually in Supabase SQL Editor:');
      console.log(`
CREATE TABLE waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  company_name VARCHAR(255),
  company_size VARCHAR(50),
  pain_point TEXT,
  name VARCHAR(255),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);`);
      return false;
    }
    
    console.log('✅ Waitlist table created successfully!');
    return true;
  } catch (err) {
    console.error('❌ Error creating table:', err.message);
    return false;
  }
}

async function testInsert() {
  try {
    console.log('\n🧪 Testing data insertion...');
    
    const testData = {
      email: 'test@example.com',
      company_name: 'Test Company',
      company_size: '1-10',
      pain_point: 'Testing the waitlist functionality',
      name: 'Test User',
      ip_address: '127.0.0.1'
    };
    
    const { data, error } = await supabase
      .from('waitlist')
      .insert([testData])
      .select();
    
    if (error) {
      console.error('❌ Insert failed:', error.message);
      return false;
    }
    
    console.log('✅ Test data inserted successfully!');
    console.log('📄 Inserted record:', data[0]);
    
    // Clean up test data
    await supabase.from('waitlist').delete().eq('email', 'test@example.com');
    console.log('🧹 Test data cleaned up.');
    
    return true;
  } catch (err) {
    console.error('❌ Insert test failed:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting Supabase Tests\n');
  
  const connectionOk = await testConnection();
  if (!connectionOk) {
    console.log('\n❌ Connection test failed. Please check your credentials.');
    process.exit(1);
  }
  
  const insertOk = await testInsert();
  if (!insertOk) {
    console.log('\n❌ Insert test failed. Please check table permissions.');
    process.exit(1);
  }
  
  console.log('\n🎉 All tests passed! Supabase is ready to use.');
  console.log('\n📋 Next steps:');
  console.log('1. Your waitlist form should now work properly');
  console.log('2. Test it at: http://localhost:5173/join');
  console.log('3. Check your Supabase dashboard for new entries');
}

runTests().catch(console.error);