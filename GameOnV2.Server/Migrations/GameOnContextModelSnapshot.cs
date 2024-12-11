﻿// <auto-generated />
using System;
using GameOnV2.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GameOnV2.Server.Migrations
{
    [DbContext(typeof(GameOnContext))]
    partial class GameOnContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("GameOnV2.Server.Models.Address", b =>
                {
                    b.Property<int>("AddressID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("AddressID"));

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("StreetNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("AddressID");

                    b.HasIndex("UserID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Contact", b =>
                {
                    b.Property<int>("ContactID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ContactID"));

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("ContactID");

                    b.HasIndex("UserID");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.CreditCard", b =>
                {
                    b.Property<int>("CreditCardID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("CreditCardID"));

                    b.Property<string>("CVV")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreditCardNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NameOnCreditCard")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("CreditCardID");

                    b.HasIndex("UserID");

                    b.ToTable("CreditCards");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Payment", b =>
                {
                    b.Property<int>("PaymentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("PaymentID"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CardHolderName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CountryCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreditCardNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CreditCardType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ExpirationDate")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Province")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("PaymentID");

                    b.HasIndex("UserID");

                    b.ToTable("Payment");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Subscription", b =>
                {
                    b.Property<int>("SubscriptionID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("SubscriptionID"));

                    b.Property<DateTime?>("EndDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("SubscriptionType")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("SubscriptionID");

                    b.HasIndex("UserID");

                    b.ToTable("Subscriptions");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FirstName")
                        .HasColumnType("longtext");

                    b.Property<string>("LastName")
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Post", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("FromTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SportName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTime>("TillTime")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserID");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Address", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("Addresses")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Contact", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("Contacts")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Contacts_Users_UserID_Unique");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.CreditCard", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("CreditCards")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_CreditCards_Users_UserID_Unique");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Payment", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("Payments")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Payments_Users_UserID_Unique");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.Subscription", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("Subscriptions")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Post", b =>
                {
                    b.HasOne("GameOnV2.Server.Models.User", "User")
                        .WithMany("Posts")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Posts_Users_UserID_Unique");

                    b.Navigation("User");
                });

            modelBuilder.Entity("GameOnV2.Server.Models.User", b =>
                {
                    b.Navigation("Addresses");

                    b.Navigation("Contacts");

                    b.Navigation("CreditCards");

                    b.Navigation("Payments");

                    b.Navigation("Posts");

                    b.Navigation("Subscriptions");
                });
#pragma warning restore 612, 618
        }
    }
}
