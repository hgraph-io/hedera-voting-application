const checkAdminStatus = async (accountId: string): Promise<string> => {
  const { data: adminAccounts, error } = await supabase
    .from('admin_accounts')
    .select('accountId')
    .eq('accountId', accountId);

  if (error) {
    console.error('Error: ', error);
    return 'user';
  } else if (adminAccounts && adminAccounts.length > 0) {
    return 'admin';
  } else {
    return 'user';
  }
};
