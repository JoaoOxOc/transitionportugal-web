﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using UserService.Services.Database;

#nullable disable

namespace UserService.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20220406145354_set_userid_string")]
    partial class set_userid_string
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("CommonLibrary.Entities.Setting", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DefaultValue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Key")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("SettingType")
                        .HasColumnType("integer");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Setting");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CreatedAt = new DateTime(2022, 4, 6, 15, 53, 54, 254, DateTimeKind.Local).AddTicks(6936),
                            DefaultValue = "3",
                            Description = "Número máximo de tentativas de autenticação falhadas",
                            Key = "MaxLoginAttempts",
                            SettingType = 3,
                            Value = "3"
                        },
                        new
                        {
                            Id = 2,
                            CreatedAt = new DateTime(2022, 4, 6, 15, 53, 54, 254, DateTimeKind.Local).AddTicks(6974),
                            DefaultValue = "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt",
                            Description = "Site key usada pelo serviço de reCAPTCHA da Google",
                            Key = "CaptchaSiteKey",
                            SettingType = 3,
                            Value = "6Lf2t0sUAAAAABiszBasjJuBZXTdqMy00zOKPOFt"
                        },
                        new
                        {
                            Id = 3,
                            CreatedAt = new DateTime(2022, 4, 6, 15, 53, 54, 254, DateTimeKind.Local).AddTicks(6977),
                            DefaultValue = "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd",
                            Description = "Secret key usada pelo serviço de reCAPTCHA da Google",
                            Key = "CaptchaSecretKey",
                            SettingType = 3,
                            Value = "6Lf2t0sUAAAAAPwP3kIvpynFqPp-7_QLfQoDQtZd"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasData(
                        new
                        {
                            Id = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ConcurrencyStamp = "a0c17a8c-7674-46e1-bcbd-57357a6b2be6",
                            Name = "Admin",
                            NormalizedName = "ADMIN"
                        },
                        new
                        {
                            Id = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                            ConcurrencyStamp = "2d002376-92c1-44a5-947b-37467119870e",
                            Name = "AssociationAdmin",
                            NormalizedName = "ASSOCIATIONADMIN"
                        },
                        new
                        {
                            Id = "179642d9-0f10-4d7d-a1a0-b485b3f6659f",
                            ConcurrencyStamp = "a8a8e58d-0b79-426e-bde0-2dacb70c4a3c",
                            Name = "User",
                            NormalizedName = "USER"
                        },
                        new
                        {
                            Id = "69d5274f-235d-4013-bbac-0c4eddf31ecc",
                            ConcurrencyStamp = "bb6ee11d-1657-4bbf-8cd1-4a92ef65393f",
                            Name = "AssociationUser",
                            NormalizedName = "ASSOCIATIONUSER"
                        });
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("UserService.Entities.Association", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("ContractEndDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime?>("ContractStartDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Filename")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool?>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool?>("IsEmailVerified")
                        .HasColumnType("boolean");

                    b.Property<bool?>("IsVerified")
                        .HasColumnType("boolean");

                    b.Property<string>("LogoImage")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Tags")
                        .HasColumnType("text");

                    b.Property<string>("Town")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Vat")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Website")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Association");
                });

            modelBuilder.Entity("UserService.Entities.ClientCredential", b =>
                {
                    b.Property<int?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int?>("Id"));

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ClientSecret")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ClientCredential");
                });

            modelBuilder.Entity("UserService.Entities.RoleScope", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ScopeId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("ScopeId");

                    b.ToTable("RoleScope");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 1
                        },
                        new
                        {
                            Id = 2,
                            RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                            ScopeId = 1
                        },
                        new
                        {
                            Id = 3,
                            RoleId = "179642d9-0f10-4d7d-a1a0-b485b3f6659f",
                            ScopeId = 1
                        },
                        new
                        {
                            Id = 4,
                            RoleId = "69d5274f-235d-4013-bbac-0c4eddf31ecc",
                            ScopeId = 1
                        },
                        new
                        {
                            Id = 5,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 2
                        },
                        new
                        {
                            Id = 6,
                            RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                            ScopeId = 2
                        },
                        new
                        {
                            Id = 7,
                            RoleId = "179642d9-0f10-4d7d-a1a0-b485b3f6659f",
                            ScopeId = 2
                        },
                        new
                        {
                            Id = 8,
                            RoleId = "69d5274f-235d-4013-bbac-0c4eddf31ecc",
                            ScopeId = 2
                        },
                        new
                        {
                            Id = 9,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 3
                        },
                        new
                        {
                            Id = 10,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 4
                        },
                        new
                        {
                            Id = 11,
                            RoleId = "244d3f1a-8594-4adb-9c59-5ec36fcdbf03",
                            ScopeId = 4
                        },
                        new
                        {
                            Id = 12,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 5
                        },
                        new
                        {
                            Id = 13,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 6
                        },
                        new
                        {
                            Id = 14,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 7
                        },
                        new
                        {
                            Id = 15,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 8
                        },
                        new
                        {
                            Id = 16,
                            RoleId = "e762fd61-0f58-4c5d-ad0e-7bd322ae3ccf",
                            ScopeId = 9
                        });
                });

            modelBuilder.Entity("UserService.Entities.Scope", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ScopeName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Scope");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Description = "Read only of he's own user data",
                            ScopeName = "user.read"
                        },
                        new
                        {
                            Id = 2,
                            Description = "Read/write of he's own user data",
                            ScopeName = "user.write"
                        },
                        new
                        {
                            Id = 3,
                            Description = "Read/write of users data",
                            ScopeName = "users.write"
                        },
                        new
                        {
                            Id = 4,
                            Description = "Read/write of association users data",
                            ScopeName = "associationusers.write"
                        },
                        new
                        {
                            Id = 5,
                            Description = "Read/write of client apps data",
                            ScopeName = "client.admin"
                        },
                        new
                        {
                            Id = 6,
                            Description = "Read/write of API settings",
                            ScopeName = "settings.admin"
                        },
                        new
                        {
                            Id = 7,
                            Description = "Read/write of Email service data like templates",
                            ScopeName = "email.admin"
                        },
                        new
                        {
                            Id = 8,
                            Description = "Read only of content management system data",
                            ScopeName = "cms.read"
                        },
                        new
                        {
                            Id = 9,
                            Description = "Read/write of content management system data",
                            ScopeName = "cms.write"
                        });
                });

            modelBuilder.Entity("UserService.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<int?>("AssociationId")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<bool?>("IsEmailVerified")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsVerified")
                        .HasColumnType("boolean");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("text");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("UpdatedAt")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("UpdatedBy")
                        .HasColumnType("text");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("AssociationId");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("UserService.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("UserService.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UserService.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("UserService.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("UserService.Entities.RoleScope", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", "IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("UserService.Entities.Scope", "Scope")
                        .WithMany("RoleScopes")
                        .HasForeignKey("ScopeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("IdentityRole");

                    b.Navigation("Scope");
                });

            modelBuilder.Entity("UserService.Entities.User", b =>
                {
                    b.HasOne("UserService.Entities.Association", "Association")
                        .WithMany("Users")
                        .HasForeignKey("AssociationId");

                    b.Navigation("Association");
                });

            modelBuilder.Entity("UserService.Entities.Association", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("UserService.Entities.Scope", b =>
                {
                    b.Navigation("RoleScopes");
                });
#pragma warning restore 612, 618
        }
    }
}
