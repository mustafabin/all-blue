puts "deleting all data"
User.destroy_all
Post.destroy_all
Comment.destroy_all

puts "creating users"
User.create!(username: "mustafa", email: "mustafa@bounty.com", password: "123", tag: "usopp is under rated", is_admin: true)
10.times do
    name = Faker::JapaneseMedia::OnePiece.character
    same_name = User.find_by(username: name)
    if same_name
        puts "user #{same_name.id} has the same name (#{name})"
        name = name + same_name.id.to_s
        puts "changing it to #{name}"
    end
    new_user = User.create!(username: name, email: "#{name.delete(' ')}@bounty.com", password: "123", tag: Faker::JapaneseMedia::OnePiece.island,is_admin: false)
    new_post = Post.create!(content: Faker::JapaneseMedia::OnePiece.quote, user_id: new_user.id)
    new_comment = Comment.create!(content: Faker::JapaneseMedia::OnePiece.quote, user_id: new_user.id, post_id: new_post.id)
end
# TrustedIp.create!(client_ip: "127.0.0.1",user_id: User.all.sample.id)
puts "created posts"
puts "created comments"

puts "seeded successfully 👒🏴‍☠️"