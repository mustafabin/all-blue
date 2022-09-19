puts "deleting all data"
User.destroy_all

puts "creating users"
10.times do
    name = Faker::JapaneseMedia::OnePiece.character
    new_user = User.create!(username: name, email: "#{name.delete(' ')}@bounty.com", password: "123", tag: Faker::JapaneseMedia::OnePiece.island)
end
TrustedIp.create!(client_ip: "127.0.0.1",user_id: User.all.sample.id)
puts "seeded successfully 👒🏴‍☠️"